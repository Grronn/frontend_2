function task21(arr) {
    const uniqueMonths = new Set(arr.map(ops => ops.month));
    const uniqueYear = new Set(arr.map(ops => ops.year)).values().next().value;
    let months=[];
    for(let numberOfMonth of uniqueMonths)
    {
        let obj={
            year: uniqueYear,
            month: numberOfMonth
        }
        res = arr.reduce((sum,current)=>current.month===numberOfMonth?sum+=1:sum,0);
        obj.opsCount=res;
        months.push(obj);
    }
    months.sort((a, b) => b.opsCount - a.opsCount);
    return months.slice(0,3);
}

function task22(year, month, arr) {
    let filterMonthAndYear = arr.filter(ops => ops.year === year && ops.month === month);
    let replenishment = filterMonthAndYear.reduce((sum, curr) => curr.type === "replenishment" ? sum + curr.amount : sum , 0); //пополнение
    let monthWithdrawal = filterMonthAndYear.reduce((sum, curr) => curr.type === "withdrawal" ? sum + curr.amount  : sum , 0); //вывод
    let payment = filterMonthAndYear.reduce((sum, curr) => curr.type === "payment" ? sum + curr.amount  : sum , 0); //оплата
    let monthBalance = replenishment - monthWithdrawal - payment;
    let withdrawalRate = (monthWithdrawal / replenishment).toFixed(4);
    let rank = withdrawalRate < 0.15 ? "Золотой" : withdrawalRate < 0.3 ? "Серебряный" : "Бронзовый";

    let monthWithZero=month.toString().padStart(2, '0');
    let lastDayOfMonth = new Date(year, month, 0).getDate();
    let date = `${year}-${monthWithZero}-${lastDayOfMonth}`;
    return {
        date,
        monthBalance,
        monthWithdrawal,
        withdrawalRate,
        rank
    };
}

function task23(arr) {
    const uniqueMonths = new Set(arr.map(ops => ops.month));
    const uniqueYear = new Set(arr.map(ops => ops.year)).values().next().value;
    let arrOfMonths=[];
    let totalBalance=0;
    for(let numberOfMonth of uniqueMonths)
    {
        let statOfMonth=task22(uniqueYear,numberOfMonth,arr);
        totalBalance+=statOfMonth.monthBalance;
        statOfMonth.totalBalance=totalBalance;
        arrOfMonths.push(statOfMonth);
    }
    return arrOfMonths;
}