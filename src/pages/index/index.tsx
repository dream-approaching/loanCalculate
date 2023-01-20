import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Button, Form } from '@tarojs/components';
import type { CommonEvent } from '@tarojs/components/types/common';
import type { FormProps } from '@tarojs/components/types/Form';
import { ListItem, SwitchTab, InputWithAddonAfter } from '../../components';
import './index.less';

const Index = () => {
  const loanTabList = ['商业', '公积金', '组合'];
  const [activeLoanTab, setActiveLoanTab] = useState(0);

  const handleClickTab = (index: number) => {
    setActiveLoanTab(index);
  };

  // 利率方式
  const [randomKey, setRandomKey] = useState(Math.random());
  const [rateType, setRateType] = useState(0);
  const handleChangeRateType = (index: number) => {
    setRateType(index);
    setRandomKey(Math.random());
  };

  // 贷款方式
  const [loanType, setLoanType] = useState(0);
  const handleChangeLoanType = (index: number) => {
    setLoanType(index);
  };

  // 跳转到结果页面 将参数传到结果页面
  const handleSubmit = (e: CommonEvent<FormProps.onSubmitEventDetail>) => {
    const { loanMoney, loanYear, lpr, addPoint, businessRate, multiple } = e.detail.value || {};

    if (activeLoanTab === 0) {
      if (!loanMoney) {
        return Taro.showToast({ title: '请输入贷款金额', icon: 'none' });
      } else if (!loanYear) {
        return Taro.showToast({ title: '请输入贷款年限', icon: 'none' });
      } else if ((rateType === 0 && !lpr) || (rateType === 1 && !businessRate)) {
        return Taro.showToast({ title: '请输入贷款利率', icon: 'none' });
      }
    }

    if (activeLoanTab === 1) {
      if (!loanMoney) {
        return Taro.showToast({ title: '请输入贷款金额', icon: 'none' });
      } else if (!loanYear) {
        return Taro.showToast({ title: '请输入贷款年限', icon: 'none' });
      } else if (!businessRate) {
        return Taro.showToast({ title: '请输入贷款利率', icon: 'none' });
      }
    }

    if (activeLoanTab === 2) {
      const { loanMoney1, businessRate1 } = e.detail.value || {};
      if (!loanMoney1) {
        return Taro.showToast({ title: '请输入公积金贷款金额', icon: 'none' });
      } else if (!businessRate1) {
        return Taro.showToast({ title: '请输入公积金贷款利率', icon: 'none' });
      } else if (!loanMoney) {
        return Taro.showToast({ title: '请输入商业贷款金额', icon: 'none' });
      } else if (!loanYear) {
        return Taro.showToast({ title: '请输入贷款年限', icon: 'none' });
      } else if ((rateType === 0 && !lpr) || (rateType === 1 && !businessRate)) {
        return Taro.showToast({ title: '请输入商业贷款利率', icon: 'none' });
      }

      const loanRate = rateType === 0 ? (+lpr + addPoint / 100).toFixed(2) : (businessRate * multiple).toFixed(2);
      return Taro.navigateTo({
        url: `/pages/result/index?loanType=${loanType}&loanYear=${loanYear}&loanRate=${loanRate}&loanMoney=${loanMoney * 10000}&loanMoney1=${
          loanMoney1 * 10000
        }&businessRate1=${businessRate1}`,
      });
    }

    let loanRate;
    if (activeLoanTab === 1) {
      loanRate = businessRate;
    } else {
      loanRate = rateType === 0 ? (+lpr + addPoint / 100).toFixed(2) : (businessRate * multiple).toFixed(2);
    }
    Taro.navigateTo({
      url: `/pages/result/index?loanType=${loanType}&loanYear=${loanYear}&loanRate=${loanRate}&loanMoney=${loanMoney * 10000}`,
    });
  };

  const handleToRateTable = () => {
    Taro.navigateTo({
      url: `/pages/rateTable/index`,
    });
  };

  return (
    <View className="wrapper">
      <View className="tabCon">
        <SwitchTab tabList={loanTabList} active={activeLoanTab} onClick={handleClickTab} />
      </View>
      {activeLoanTab !== 2 && (
        <Form onSubmit={handleSubmit} className="formCon">
          <ListItem label="贷款金额（万元）">
            <InputWithAddonAfter focus name="loanMoney" type="digit" maxlength={15} addonText="万元" />
          </ListItem>
          <ListItem label="贷款年限（年）">
            <InputWithAddonAfter name="loanYear" type="digit" maxlength={2} addonText="年" />
          </ListItem>
          {activeLoanTab !== 1 && (
            <ListItem label="利率方式">
              <SwitchTab tabList={['LPR', '基准利率']} size="small" active={rateType} onClick={handleChangeRateType} />
            </ListItem>
          )}
          {activeLoanTab === 1 ? (
            <ListItem label="公积金贷款利率（%）">
              <InputWithAddonAfter name="businessRate" type="digit" maxlength={10} addonText="%" initialValue="3.25" />
            </ListItem>
          ) : rateType === 0 ? (
            <View key={randomKey}>
              <ListItem label="LPR（%）">
                <InputWithAddonAfter name="lpr" type="digit" maxlength={10} addonText="%" initialValue="4.3" />
              </ListItem>
              <ListItem label="基点（‱）">
                <InputWithAddonAfter name="addPoint" type="number" maxlength={10} addonText="‱" initialValue="0" />
              </ListItem>
            </View>
          ) : (
            <View key={randomKey}>
              <ListItem label="商业贷款利率（%）">
                <InputWithAddonAfter name="businessRate" type="digit" maxlength={10} addonText="%" initialValue="4.9" />
              </ListItem>
              <ListItem label="贷款利率折扣（倍）">
                <InputWithAddonAfter name="multiple" type="digit" maxlength={10} addonText="倍" initialValue="1.0" />
              </ListItem>
            </View>
          )}
          <ListItem label="贷款方式">
            <SwitchTab tabList={['等额本息', '等额本金']} size="small" active={loanType} onClick={handleChangeLoanType} />
          </ListItem>
          <Button formType="submit" className="submitBtn">
            计算
          </Button>
        </Form>
      )}
      {activeLoanTab === 2 && (
        <Form onSubmit={handleSubmit} className="formCon">
          <ListItem label="公积金贷款金额（万元）">
            <InputWithAddonAfter focus name="loanMoney1" type="digit" maxlength={15} addonText="万元" />
          </ListItem>
          <ListItem label="公积金贷款利率（%）">
            <InputWithAddonAfter name="businessRate1" type="digit" maxlength={10} addonText="%" initialValue="3.25" />
          </ListItem>
          <ListItem label="商业贷款金额（万元）">
            <InputWithAddonAfter name="loanMoney" type="digit" maxlength={15} addonText="万元" />
          </ListItem>
          <ListItem label="商业贷款利率方式">
            <SwitchTab tabList={['LPR', '基准利率']} size="small" active={rateType} onClick={handleChangeRateType} />
          </ListItem>
          {rateType === 0 ? (
            <View key={randomKey}>
              <ListItem label="LPR（%）">
                <InputWithAddonAfter name="lpr" type="digit" maxlength={10} addonText="%" initialValue="4.3" />
              </ListItem>
              <ListItem label="基点（‱）">
                <InputWithAddonAfter name="addPoint" type="number" maxlength={10} addonText="‱" initialValue="0" />
              </ListItem>
            </View>
          ) : (
            <View key={randomKey}>
              <ListItem label="商业贷款利率（%）">
                <InputWithAddonAfter name="businessRate" type="digit" maxlength={10} addonText="%" initialValue="4.9" />
              </ListItem>
              <ListItem label="贷款利率折扣（倍）">
                <InputWithAddonAfter name="multiple" type="digit" maxlength={10} addonText="倍" initialValue="1.0" />
              </ListItem>
            </View>
          )}
          <ListItem label="贷款年限（年）">
            <InputWithAddonAfter name="loanYear" type="digit" maxlength={2} addonText="年" />
          </ListItem>
          <ListItem label="贷款方式">
            <SwitchTab tabList={['等额本息', '等额本金']} size="small" active={loanType} onClick={handleChangeLoanType} />
          </ListItem>
          <Button formType="submit" className="submitBtn">
            计算
          </Button>
        </Form>
      )}
      <View className="bottomBtn">
        <Text className="btnText" onClick={handleToRateTable}>
          房贷年利率表
        </Text>
      </View>
    </View>
  );
};

export default Index;
