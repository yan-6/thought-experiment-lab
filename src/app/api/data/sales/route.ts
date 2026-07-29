import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      transactions: 20,
      total_revenue: 4253,
      avg_order: "212.63",
      categories: 5,
      regions: 5,
      categories_list: ["Electronics", "Clothing", "Sports", "Home", "Books"],
      regions_list: ["West", "North", "East", "South", "Central"],
      payment_methods: ["Credit Card", "Debit Card", "PayPal", "Cash"],
      stores: ["Online", "Physical Store"],
    },
  });
}