/**
 * TARGO SMART MIS — Sample Datasets, Benchmarks & KPI Definitions
 */

const SAMPLE_BENCHMARKS = {
  retail: {
    datasetName: "Multi_Store_Retail_Q2_Raw.xlsx",
    totalRows: 1248,
    duplicatesRemoved: 132,
    datesStandardized: 48,
    outliersFlagged: 12,
    qualityScore: "99.4%",
    cleanedRows: [
      { row_id: "ROW_1001", invoice_date: "2026-06-01", product_name: "4K Ultra Gaming Monitor", category: "Electronics", region: "North", quantity: 24, unit_price: "$450.00", total_amount: "$10,800.00", cleaning_flag: "Whitespace trimmed" },
      { row_id: "ROW_1002", invoice_date: "2026-06-02", product_name: "Ergonomic Mesh Chair", category: "Furniture", region: "West", quantity: 18, unit_price: "$220.00", total_amount: "$3,960.00", cleaning_flag: "Date format converted" },
      { row_id: "ROW_1003", invoice_date: "2026-06-04", product_name: "Wireless ANC Headphones", category: "Electronics", region: "South", quantity: 45, unit_price: "$180.00", total_amount: "$8,100.00", cleaning_flag: "Currency symbol parsed" },
      { row_id: "ROW_1004", invoice_date: "2026-06-05", product_name: "Standing Desk Converter", category: "Furniture", region: "North", quantity: 12, unit_price: "$340.00", total_amount: "$4,080.00", cleaning_flag: "Category normalized" },
      { row_id: "ROW_1005", invoice_date: "2026-06-08", product_name: "Enterprise Pro Suite", category: "Software", region: "East", quantity: 30, unit_price: "$420.00", total_amount: "$12,600.00", cleaning_flag: "Duplicate removed (x2)" },
      { row_id: "ROW_1006", invoice_date: "2026-06-10", product_name: "USB-C Thunderbolt Hub", category: "Accessories", region: "West", quantity: 60, unit_price: "$85.00", total_amount: "$5,100.00", cleaning_flag: "Clean" },
      { row_id: "ROW_1007", invoice_date: "2026-06-12", product_name: "Smart POS Terminal", category: "Hardware", region: "South", quantity: 8, unit_price: "$420.00", total_amount: "$3,360.00", cleaning_flag: "Outlier validated" }
    ],
    kpis: {
      revenue: "$48,000",
      margin: "41.8%",
      cac: "$312",
      returnRate: "4.8%",
      orders: "1,248"
    },
    monthlyRevenue: {
      '6m': { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], values: [28000, 34000, 31000, 39000, 42000, 48000] },
      '12m': { labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], values: [19000, 21500, 20000, 23500, 25000, 27000, 28000, 34000, 31000, 39000, 42000, 48000] }
    },
    targets: [32000, 32000, 32000, 40000, 40000, 40000],
    lastYear: [22000, 25000, 24000, 29000, 31000, 35000]
  },

  saas: {
    datasetName: "SaaS_Enterprise_MRR_Fact.csv",
    totalRows: 850,
    duplicatesRemoved: 44,
    datesStandardized: 92,
    outliersFlagged: 6,
    qualityScore: "99.8%",
    cleanedRows: [
      { row_id: "MRR_201", invoice_date: "2026-06-01", product_name: "Enterprise Annual License", category: "SaaS Subscriptions", region: "North America", quantity: 15, unit_price: "$2,400.00", total_amount: "$36,000.00", cleaning_flag: "Net-30 Term Mapped" },
      { row_id: "MRR_202", invoice_date: "2026-06-03", product_name: "Growth Tier Monthly", category: "SaaS Subscriptions", region: "Europe", quantity: 80, unit_price: "$199.00", total_amount: "$15,920.00", cleaning_flag: "EUR to USD FX Normalized" },
      { row_id: "MRR_203", invoice_date: "2026-06-06", product_name: "API Add-on Bundle", category: "Usage Add-ons", region: "APAC", quantity: 120, unit_price: "$99.00", total_amount: "$11,880.00", cleaning_flag: "Tax ID Sanitized" }
    ],
    kpis: {
      revenue: "$63,800",
      margin: "78.4%",
      cac: "$440",
      returnRate: "1.2%",
      orders: "850"
    },
    monthlyRevenue: {
      '6m': { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], values: [42000, 46000, 49000, 53000, 58000, 63800] },
      '12m': { labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], values: [31000, 33000, 36000, 38000, 40000, 41000, 42000, 46000, 49000, 53000, 58000, 63800] }
    },
    targets: [45000, 45000, 50000, 50000, 55000, 60000],
    lastYear: [30000, 32000, 35000, 37000, 40000, 44000]
  },

  healthcare: {
    datasetName: "Diagnostic_Clinic_Revenue_2026.csv",
    totalRows: 620,
    duplicatesRemoved: 18,
    datesStandardized: 31,
    outliersFlagged: 4,
    qualityScore: "99.1%",
    cleanedRows: [
      { row_id: "MED_401", invoice_date: "2026-06-01", product_name: "Comprehensive MRI Scan", category: "Radiology", region: "Central Hub", quantity: 32, unit_price: "$650.00", total_amount: "$20,800.00", cleaning_flag: "CPT Code Validated" },
      { row_id: "MED_402", invoice_date: "2026-06-02", product_name: "Advanced Blood Panel", category: "Pathology", region: "North Wing", quantity: 140, unit_price: "$120.00", total_amount: "$16,800.00", cleaning_flag: "Patient ID Anonymized" }
    ],
    kpis: {
      revenue: "$37,600",
      margin: "52.0%",
      cac: "$180",
      returnRate: "0.5%",
      orders: "620"
    },
    monthlyRevenue: {
      '6m': { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], values: [26000, 28000, 29500, 32000, 34500, 37600] },
      '12m': { labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], values: [20000, 21000, 22000, 24000, 25000, 25500, 26000, 28000, 29500, 32000, 34500, 37600] }
    },
    targets: [28000, 28000, 30000, 30000, 33000, 35000],
    lastYear: [21000, 23000, 24000, 25000, 27000, 29000]
  }
};

const KPI_DEFINITIONS = [
  { id: "kpi-1", name: "Monthly Gross Revenue", target: "$40,000", actual: "$48,000", variance: "+20.0%", warning: "< $36,000", critical: "< $32,000", status: "green" },
  { id: "kpi-2", name: "Gross Profit Margin %", target: "38.0%", actual: "41.8%", variance: "+3.8%", warning: "< 35.0%", critical: "< 30.0%", status: "green" },
  { id: "kpi-3", name: "Product Return Rate %", target: "4.0%", actual: "4.8%", variance: "+0.8%", warning: "> 4.0%", critical: "> 5.5%", status: "amber" },
  { id: "kpi-4", name: "Customer Acquisition Cost", target: "$350", actual: "$312", variance: "-10.8%", warning: "> $380", critical: "> $420", status: "green" },
  { id: "kpi-5", name: "DSO (Days Sales Outstanding)", target: "30 Days", actual: "34 Days", variance: "+4 Days", warning: "> 35 Days", critical: "> 45 Days", status: "amber" },
  { id: "kpi-6", name: "Cash Collection Efficiency", target: "95.0%", actual: "94.2%", variance: "-0.8%", warning: "< 90.0%", critical: "< 85.0%", status: "green" }
];

const INITIAL_ALERTS = [
  {
    id: "alt-01",
    severity: "warning",
    title: "KPI Threshold Exceeded: Return Rate (4.8%)",
    message: "Product return rate in East Zone reached 4.8%, breaching the configured 4.0% ceiling. Trigger SKU: Enterprise Pro Suite.",
    time: "10 mins ago",
    status: "Unresolved"
  },
  {
    id: "alt-02",
    severity: "warning",
    title: "DSO Aging Alert: 34 Days",
    message: "Distributor receivables DSO shifted +4 days above 30-day baseline. 3 invoices over $15,000 pending reconciliation.",
    time: "25 mins ago",
    status: "Unresolved"
  }
];

const PREBUILT_SQL_QUERIES = {
  monthly_rev: `SELECT 
    TO_CHAR(invoice_date, 'Mon YYYY') AS month_label,
    COUNT(id) AS total_orders,
    SUM(quantity) AS total_units_sold,
    ROUND(SUM(amount), 2) AS monthly_revenue,
    ROUND(AVG(gross_margin) * 100, 2) AS avg_margin_pct
FROM public.sales_fact
WHERE organization_id = 'org_enterprise_01'
GROUP BY 1, DATE_TRUNC('month', invoice_date)
ORDER BY DATE_TRUNC('month', invoice_date) DESC
LIMIT 12;`,

  category_margin: `SELECT 
    category,
    COUNT(DISTINCT product_id) AS active_skus,
    SUM(quantity) AS units_sold,
    ROUND(SUM(amount), 2) AS total_revenue,
    ROUND(AVG(gross_margin) * 100, 1) || '%' AS margin_percentage
FROM public.sales_fact
GROUP BY category
ORDER BY total_revenue DESC;`,

  regional_variance: `SELECT 
    region,
    ROUND(SUM(amount), 2) AS actual_revenue,
    ROUND(AVG(target_amount), 2) AS quarterly_target,
    ROUND((SUM(amount) - AVG(target_amount)) / AVG(target_amount) * 100, 2) || '%' AS variance_pct
FROM public.sales_fact
JOIN public.regional_targets USING (region)
GROUP BY region
ORDER BY actual_revenue DESC;`,

  active_alerts: `SELECT 
    severity,
    message,
    status,
    created_at
FROM public.alerts
WHERE status != 'Resolved'
ORDER BY created_at DESC;`
};
