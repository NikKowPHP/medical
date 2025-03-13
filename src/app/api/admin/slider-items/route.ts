import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { CACHE_TAGS } from '@/lib/utils/cache';
import { sliderService } from '@/lib/services/slider.service';
import { del } from '@vercel/blob';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    // Retrieve the slider item using its ID.
    const sliderItem = await sliderService.getSliderItems();
    if (!sliderItem) {
      return NextResponse.json(
        { error: 'Slider item not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(sliderItem, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    logger.error(`Error fetching slider item: ${error}`);
    return NextResponse.json(
      { error: 'Failed to fetch slider item' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  if (!body.id) {
    return NextResponse.json(
      { message: 'ID is required for updating slider item' },
      { status: 400 }
    );
  }
  try {
    logger.log(`Updating slider item: ${body.id} with data: ${JSON.stringify(body)}`);
    const updatedSlider = await sliderService.updateSliderItem(body.id, body);
    revalidateTag(CACHE_TAGS.SLIDER);
    return NextResponse.json(updatedSlider, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    logger.error(`Error updating slider item: ${error}`);
    return NextResponse.json(
      { error: 'Failed to update slider item' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  if (!body.id) {
    return NextResponse.json(
      { message: 'ID is required for deleting slider item' },
      { status: 400 }
    );
  }
  try {
    // 1. Get the slider item first.
    const sliderItem = await sliderService.getSliderItemById(body.id);
    logger.log('slider.route.delete.log', sliderItem);
    if (!sliderItem) {
      return NextResponse.json(
        { error: 'Slider item not found' },
        { status: 404 }
      );
    }

    // 2. Delete files from blob storage.
    const deletePromises = [];
    if (sliderItem.image_url) {
      deletePromises.push(del(sliderItem.image_url));
    }
    logger.log('slider.route.delete.log deleting file from blob', deletePromises);
    const results = await Promise.allSettled(deletePromises);
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        logger.log(`Deleted file ${index + 1} successfully`);
      } else {
        logger.error(`Failed to delete file ${index + 1}:`, result.reason);
      }
    });

    // 3. Delete the slider item from the database.
    await sliderService.deleteSliderItem(body.id);
    logger.log('slider.route.delete.log deleted slider item from database');

    revalidateTag(CACHE_TAGS.SLIDER);
    logger.log('slider.route.delete.log revalidated cache');

    return NextResponse.json(
      { success: true },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
      }
    );
  } catch (error) {
    logger.error(`Error deleting slider item: ${error}`);
    return NextResponse.json(
      { error: 'Failed to delete slider item' },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
    }
  );
}