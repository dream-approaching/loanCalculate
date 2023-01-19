import React, { useState, useEffect } from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { View, Text, Button, Form, Input } from '@tarojs/components';
import type { CommonEvent } from '@tarojs/components/types/common';
import type { FormProps } from '@tarojs/components/types/Form';
import { useEnv, useNavigationBar, useModal, useToast } from 'taro-hooks';
import logo from './hook.png';
import { useGetLoanDetail } from '../../hooks';
import { LOAN_TYPE } from '../../constants';
import { ListItem, SwitchTab, InputWithAddonAfter } from '../../components';
import { BenJinType, DetailByMonth } from '../../types';
import './index.less';

const Result = () => {
  const router = useRouter();

  const { perMonthNeed, loanListByMonth, updateLoanInfo, firstMonthNeed, interestTotal, totalNeed, updateLoanInfo2 } = useGetLoanDetail();
  const { loanType = 0, loanYear = 1, loanRate = 1, loanMoney = 0, businessRate1 = 0, loanMoney1 = 0 } = router.params;

  const isBusiness = +loanMoney1 && +businessRate1;
  useEffect(() => {
    // 混合贷款
    if (isBusiness) {
      updateLoanInfo2({ loanType, loanYear, loanRate, loanMoney, loanMoney1, businessRate1 } as any);
    } else {
      updateLoanInfo({ loanType, loanYear, loanRate, loanMoney } as any);
    }
  }, []);

  return (
    <View className="wrapper">
      <ListItem label={+loanType === LOAN_TYPE.BenXi ? '每月月供' : '首月月供'}>
        <Text className="commonLine firstLine">{(+loanType === LOAN_TYPE.BenXi ? perMonthNeed : firstMonthNeed).toFixed(2)} 元</Text>
      </ListItem>
      {isBusiness ? (
        <>
          <ListItem label="公积金贷款总额">
            <Text className="commonLine">{+loanMoney1 / 10000} 万</Text>
          </ListItem>
          <ListItem label="公积金贷款利率">
            <Text className="commonLine">{businessRate1} %</Text>
          </ListItem>
          <ListItem label="商业贷款总额">
            <Text className="commonLine">{+loanMoney / 10000} 万</Text>
          </ListItem>
          <ListItem label="商业贷款利率">
            <Text className="commonLine">{loanRate} %</Text>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem label="贷款总额">
            <Text className="commonLine">{+loanMoney / 10000} 万</Text>
          </ListItem>
          <ListItem label="利率">
            <Text className="commonLine">{loanRate} %</Text>
          </ListItem>
        </>
      )}

      <ListItem label="贷款年限">
        <Text className="commonLine">{loanYear} 年</Text>
      </ListItem>
      <ListItem label="累计利息">
        <Text className="commonLine">{interestTotal.toFixed(2)} 元</Text>
      </ListItem>
      <ListItem label="累计还款总额">
        <Text className="commonLine">{(totalNeed * 1).toFixed(2)} 元</Text>
      </ListItem>
      <ListItem label="贷款方式">
        <Text className="commonLine">{+loanType === LOAN_TYPE.BenXi ? '等额本息' : '等额本金'}</Text>
      </ListItem>
      <View className="tableCon">
        <View className="tableHeader">
          <Text className="th td">期数</Text>
          <Text className="th td">月供(元)</Text>
          <Text className="th td">本金(元)</Text>
          <Text className="th td">利息(元)</Text>
          <Text className="th td">剩余贷款(元)</Text>
        </View>
        <View className="tableBody">
          {loanListByMonth.map((item: DetailByMonth, index: number) => {
            return (
              <View className="tr" key={index}>
                <Text className="td">第{index + 1}期</Text>
                <Text className="td">{item.currentMonthNeed.toFixed(2)}</Text>
                <Text className="td">{item.principal.toFixed(2)}</Text>
                <Text className="td">{item.interest.toFixed(2)}</Text>
                <Text className="td">{item.restMoney.toFixed(2)}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Result;
