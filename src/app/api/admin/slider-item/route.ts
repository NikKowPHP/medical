import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { CACHE_TAGS } from '@/lib/utils/cache';
import { sliderService } from '@/lib/services/slider.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// GET: Retrieve all slider items
export async function GET() {
  try {
    const sliderItems = await sliderService.getSliderItems();
    if (!sliderItems) {
      return NextResponse.json(
        { error: 'Slider items not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(sliderItems, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    logger.error(`Error fetching slider items: ${error}`);
    return NextResponse.json(
      { error: 'Failed to fetch slider items' },
      { status: 500 }
    );
  }
}

// POST: Create a new slider item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Create a new slider item with the provided data.
    const newSliderItem = await sliderService.createSliderItem(body);
    revalidateTag(CACHE_TAGS.SLIDER);
    return NextResponse.json(newSliderItem, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    logger.error(`Error creating slider item: ${error}`);
    return NextResponse.json(
      { error: 'Failed to create slider item' },
      { status: 500 }
    );
  }
}


// DELETE: Delete an existing slider item
export async function DELETE(request: NextRequest) {
  const body = await request.json();
  if (!body.id) {
    return NextResponse.json(
      { message: 'ID is required for deleting slider item' },
      { status: 400 }
    );
  }
  await sliderService.deleteSliderItem(body.id);
  revalidateTag(CACHE_TAGS.SLIDER);
  return NextResponse.json({ message: 'Slider item deleted successfully' });
}

// PUT: Update an existing slider item
export async function PUT(request: NextRequest) {
  const body = await request.json();
  const updatedSliderItem = await sliderService.updateSliderItem(body.id, body);
  revalidateTag(CACHE_TAGS.SLIDER);
  return NextResponse.json(updatedSliderItem);
}

// OPTIONS: Handle CORS pre-flight requests.
export function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
    }
  );
}