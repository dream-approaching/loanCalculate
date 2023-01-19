import { useState } from 'react';
import { LOAN_TYPE } from '../constants';
import { BenJinType, DetailByMonth } from '../types';

const useGetLoanDetail = () => {
  const [perMonthNeed, setPerMonthNeed] = useState(0); // 每月还款金额
  const [firstMonthNeed, setFirstMonthNeed] = useState(0); // 首月还款金额
  const [interestTotal, setInterestTotal] = useState(0); // 总利息
  const [totalNeed, setTotalNeed] = useState(0); // 总还款金额

  const [loanListByMonth, setLoanListByMonth] = useState<DetailByMonth[]>([]);

  // 商贷或公积金贷款
  const updateLoanInfo = ({ loanType, loanYear, loanRate, loanMoney }: BenJinType) => {
    const monthRate = loanRate / 12 / 100; // 月利率

    // 等额本息
    if (+loanType === LOAN_TYPE.BenXi) {
      // 计算每个月还款金额
      const result = (loanMoney * monthRate * Math.pow(1 + monthRate, loanYear * 12)) / (Math.pow(1 + monthRate, loanYear * 12) - 1);
      setPerMonthNeed(result);

      // 计算每个月还款金额的本金和利息
      const list: DetailByMonth[] = [];
      let restMoney = loanMoney;
      for (let i = 0; i < loanYear * 12; i++) {
        const interest = restMoney * monthRate;
        const principal = result - interest;
        // 最后一个月剩余贷款金额为0
        restMoney = i === loanYear * 12 - 1 ? 0 : restMoney - principal;
        list.push({
          interest,
          principal,
          restMoney,
          currentMonthNeed: interest + principal,
        });
      }
      setLoanListByMonth(list);

      // 计算总利息
      const interest = result * loanYear * 12 - loanMoney;
      setInterestTotal(interest);

      // 计算总还款金额
      setTotalNeed(+interest + +loanMoney);

      return {
        perMonthNeed: result,
        loanListByMonth: list,
        interestTotal: interest,
        totalNeed: +interest + +loanMoney,
      };
    }

    // 等额本金
    if (+loanType === LOAN_TYPE.BenJin) {
      // 计算首月还款金额
      const firstMonth = loanMoney / (loanYear * 12) + loanMoney * monthRate;
      setFirstMonthNeed(firstMonth);

      // 计算每个月还款金额的本金和利息
      const monthMoney = loanMoney / (loanYear * 12);
      const list: DetailByMonth[] = [];
      let restMoney = loanMoney;
      let totalInterest = 0;
      for (let i = 0; i < loanYear * 12; i++) {
        const interest = restMoney * monthRate;
        const principal = monthMoney;
        restMoney = i === loanYear * 12 - 1 ? 0 : restMoney - principal;
        list.push({
          interest,
          principal,
          restMoney,
          currentMonthNeed: +interest + +principal,
        });
        totalInterest += +interest;
      }
      setLoanListByMonth(list);

      // 计算总利息
      setInterestTotal(totalInterest);

      // 计算总还款金额
      setTotalNeed(+totalInterest + +loanMoney);

      return {
        firstMonthNeed: firstMonth,
        loanListByMonth: list,
        interestTotal: totalInterest,
        totalNeed: +totalInterest + +loanMoney,
      };
    }
  };

  // 组合贷款
  const updateLoanInfo2 = ({ loanType, loanYear, loanRate, loanMoney, loanMoney1, businessRate1 }: BenJinType) => {
    // 公积金部分参数
    const {
      perMonthNeed: perMonthNeed1 = 0,
      loanListByMonth: loanListByMonth1 = [],
      firstMonthNeed: firstMonthNeed1 = 0,
      interestTotal: interestTotal1 = 0,
      totalNeed: totalNeed1 = 0,
    } = updateLoanInfo({
      loanType,
      loanYear,
      loanRate: businessRate1,
      loanMoney: loanMoney1,
    } as any) || {};

    // 商贷部分参数
    const {
      perMonthNeed: perMonthNeed2 = 0,
      loanListByMonth: loanListByMonth2 = [],
      firstMonthNeed: firstMonthNeed2 = 0,
      interestTotal: interestTotal2 = 0,
      totalNeed: totalNeed2 = 0,
    } = updateLoanInfo({
      loanType,
      loanYear,
      loanRate,
      loanMoney,
    } as any) || {};

    if (+loanType === LOAN_TYPE.BenXi) {
      // 计算每个月还款金额
      setPerMonthNeed(+perMonthNeed1 + +perMonthNeed2);
    } else {
      // 计算首月还款金额
      setFirstMonthNeed(+firstMonthNeed1 + +firstMonthNeed2);
    }

    // 计算每个月还款金额的本金和利息
    const list: DetailByMonth[] = [];
    for (let i = 0; i < loanYear * 12; i++) {
      const interest = loanListByMonth1[i].interest + loanListByMonth2[i].interest;
      const principal = loanListByMonth1[i].principal + loanListByMonth2[i].principal;
      const restMoney = loanListByMonth1[i].restMoney + loanListByMonth2[i].restMoney;
      list.push({
        interest,
        principal,
        restMoney,
        currentMonthNeed: interest + principal,
      });
    }
    setLoanListByMonth(list);

    // 计算总利息
    setInterestTotal(+interestTotal1 + +interestTotal2);

    // 计算总还款金额
    setTotalNeed(+totalNeed1 + +totalNeed2);
  };

  return {
    updateLoanInfo,
    updateLoanInfo2,
    perMonthNeed,
    loanListByMonth,
    firstMonthNeed,
    interestTotal,
    totalNeed,
  };
};

export default useGetLoanDetail;
