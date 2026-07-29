import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      total: 5,
      dept_count: 4,
      departments: ["技术部", "市场部", "财务部", "人事部"],
      avg_salary: 16000,
      max_salary: 25000,
      min_salary: 10000,
      region: "某地区",
    },
  });
}