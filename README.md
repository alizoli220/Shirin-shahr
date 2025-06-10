# Shirin-shahr
<!DOCTYPE html>
<html lang="fa">
<head>
<meta charset="UTF-8" />
<title>دفترچه اقساط</title>
<style>
  body { font-family: Tahoma, sans-serif; direction: rtl; padding: 20px; }
  table { border-collapse: collapse; width: 100%; margin-top: 20px; }
  th, td { border: 1px solid #333; padding: 8px; text-align: center; }
  th { background-color: #f2f2f2; }
  h2 { text-align: center; }
</style>
</head>
<body>
<h2>دفترچه اقساط ماهانه</h2>
<div id="installment-table"></div>

<script>
  // داده‌های نمونه
  const downPayment = 200000; // پیش پرداخت
  const monthlyInstallment = 100000; // مبلغ قسط ماهانه
  const installmentsCount = 8; // تعداد اقساط
  const payments = [150000, 250000, 100000]; // مبالغ واریزی به ترتیب

  // محاسبه وضعیت پرداخت اقساط
  let remainingPayment = payments.reduce((a,b) => a + b, 0);
  let rows = '';
  for(let i = 1; i <= installmentsCount; i++) {
    let status = 'پرداخت نشده';
    let paidAmount = 0;
    if(remainingPayment >= monthlyInstallment) {
      status = 'پرداخت شده';
      paidAmount = monthlyInstallment;
      remainingPayment -= monthlyInstallment;
    } else if(remainingPayment > 0) {
      status = `نیمه پرداخت (${remainingPayment.toLocaleString()} تومان)`;
      paidAmount = remainingPayment;
      remainingPayment = 0;
    }
    rows += `<tr>
      <td>${i}</td>
      <td>${monthlyInstallment.toLocaleString()}</td>
      <td>تاریخ شمسی</td>
      <td>${paidAmount.toLocaleString()}</td>
      <td>${status}</td>
    </tr>`;
  }

  // ساخت جدول HTML
  const tableHTML = `
    <p>پیش پرداخت: ${downPayment.toLocaleString()} تومان</p>
    <table>
      <thead>
        <tr>
          <th>شماره قسط</th>
          <th>مبلغ قسط</th>
          <th>تاریخ پرداخت</th>
          <th>مبلغ واریزی</th>
          <th>وضعیت پرداخت</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  document.getElementById('installment-table').innerHTML = tableHTML;
</script>
</body>
</html>
