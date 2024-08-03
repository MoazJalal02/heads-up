import { NextResponse } from 'next/server';
import { connectToDb } from '@/lib/dbConnect';
import { Product } from '@/lib/models/productModel';

export const POST = async () => {
  try {
    await connectToDb();
    console.log('Connected to MongoDB');

    // Update all documents to change the price field to double
    const result = await Product.updateMany(
      {},
      [
        {
          $set: {
            price: { $convert: { input: "$price", to: "double", onError: null, onNull: null } }
          }
        }
      ]
    );

    console.log('Update result:', result);

    return NextResponse.json({
      message: `${result.matchedCount} documents matched the filter, updated ${result.modifiedCount} documents.`,
    });
  } catch (err) {
    console.log('Error:', err);
    throw new Error('Failed to update documents!');
  }
};

