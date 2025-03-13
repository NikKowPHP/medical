import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { revalidateTag } from 'next/cache';
import { CACHE_TAGS } from '@/lib/utils/cache';
import { sliderService } from '@/lib/services/slider.service';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// GET: Retrieve all slider items
export async function GET(request: NextRequest) {
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

// OPTIONS: Handle CORS pre-flight requests.
export function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
    }
  );
}