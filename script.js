let payments = []; // لیست پرداخت‌های انجام‌شده

function generateInstallments() {
    let contractAmount = parseFloat(document.getElementById('contractAmount').value);
    let installments = parseInt(document.getElementById('installments').value);
    let prePayment = parseFloat(document.getElementById('prePayment').value);
    let startDate = new Date(document.getElementById('startDate').value);

    let monthlyInstallment = (contractAmount - prePayment) / installments;

    document.getElementById("prePaymentDisplay").innerText = prePayment.toFixed(2);

    let tableHTML = "<table><tr><th>ماه</th><th>تاریخ پرداخت</th><th>مبلغ قسط</th><th>وضعیت</th></tr>";
    
    for (let i = 0; i < installments; i++) {
        let paymentDate = new Date(startDate);
        paymentDate.setMonth(paymentDate.getMonth() + i);
        tableHTML += `<tr id="installment-${i}"><td>${i + 1}</td><td>${paymentDate.toLocaleDateString('fa-IR')}</td><td>${monthlyInstallment.toFixed(2)}</td><td>پرداخت نشده</td></tr>`;
    }

    tableHTML += "</table>";
    document.getElementById("installmentTable").innerHTML = tableHTML;
}

function updatePayments() {
    let paymentAmount = parseFloat(document.getElementById('paymentAmount').value);
    payments.push(paymentAmount);

    let remaining = paymentAmount;
    let installments = document.querySelectorAll("tr[id^='installment-']");

    for (let row of installments) {
        let installmentAmount = parseFloat(row.children[2].innerText);
        if (remaining >= installmentAmount) {
            row.children[3].innerText = "پرداخت شده";
            remaining -= installmentAmount;
        } else {
            row.children[3].innerText = `باقیمانده: ${remaining.toFixed(2)}`;
            break;
        }
    }
}

function downloadWord() {
    let text = document.getElementById("installmentTable").innerHTML;
    let blob = new Blob([text], { type: "application/msword" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Installments.doc";
    link.click();
}