// components/EditChartModal.tsx
const handleSave = async () => {
  const { data: existing } = await supabase
    .from("user_chart_data")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    const confirmOverwrite = window.confirm(
      "We found previous values. Overwrite them?"
    );
    if (!confirmOverwrite) return;
  }

  await supabase.from("user_chart_data").upsert({
    email,
    chart_values: chartData
  });

  onSuccess(chartData);
};
