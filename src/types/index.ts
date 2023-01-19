import { LOAN_TYPE } from '../constants';

export type BenJinType = {
  loanType: LOAN_TYPE; // 贷款方式
  loanYear: number; // 贷款期限
  loanRate: number; // 年利率
  loanMoney: number; // 贷款金额
  loanMoney1: number; // 组合贷款 住房公积金贷款金额
  businessRate1: number; // 组合贷款 住房公积金贷款利率
};

export type DetailByMonth = {
  // 月利息
  interest: number;
  // 月本金
  principal: number;
  // 剩余本金
  restMoney: number;
  // 当月月供
  currentMonthNeed: number;
};
