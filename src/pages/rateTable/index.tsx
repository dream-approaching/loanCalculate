import { View, Text } from '@tarojs/components';
import './index.less';

const table1 = [
  { time: '2022-08-22', year1: 3.65, year5: 4.3 },
  { time: '2022-05-20', year1: 3.7, year5: 4.45 },
  { time: '2022-02-21', year1: 3.7, year5: 4.6 },
  { time: '2020-04-21', year1: 3.85, year5: 4.65 },
  { time: '2020-02-20', year1: 4.05, year5: 4.75 },
  { time: '2020-01-20', year1: 4.15, year5: 4.8 },
  { time: '2019-10-21', year1: 4.2, year5: 4.85 },
  { time: '2019-08-20', year1: 4.25, year5: 4.85 },
];

const table2 = [
  { time: '5年以上', rate1: 4.9, rate2: 3.25 },
  { time: '3~5年(含)', rate1: 4.75, rate2: 2.75 },
  { time: '1~3年(含)', rate1: 4.75, rate2: 2.75 },
  { time: '1年', rate1: 4.35, rate2: 2.75 },
  { time: '6个月', rate1: 4.35, rate2: 2.75 },
];

const RateTable = () => {
  return (
    <View className="wrapper">
      <Text className="topText">
        2019年12月28日，央行发布基准利率转换为 LPR 相关公告，将原合同约定的定价方式转换为以 LPR
        为定价基准加点的定价方式，加点数值在合同剩余期限内固定不变；也可选择继续为固定利率。
      </Text>
      <Text className="tableTitle">最新贷款市场高价利率 LPR </Text>
      <View className="tableCon">
        <View className="tableHeader">
          <Text className="th td">发布时间</Text>
          <Text className="th td">商贷 LPR 一年期（%）</Text>
          <Text className="th td">商贷 LPR 一年期（%）</Text>
        </View>
        <View className="tableBody">
          {table1.map((item, index: number) => {
            return (
              <View className="tr" key={index}>
                <Text className="td">{item.time}</Text>
                <Text className="td">{item.year1}</Text>
                <Text className="td">{item.year5}</Text>
              </View>
            );
          })}
        </View>
      </View>
      <Text className="tableTitle">最新贷款基准利率</Text>
      <View className="tableCon">
        <View className="tableHeader">
          <Text className="th td">贷款期限</Text>
          <Text className="th td">商业贷款利率（%） </Text>
          <Text className="th td">公积金贷款利率（%）</Text>
        </View>
        <View className="tableBody">
          {table2.map((item, index: number) => {
            return (
              <View className="tr" key={index}>
                <Text className="td">{item.time}</Text>
                <Text className="td">{item.rate1}</Text>
                <Text className="td">{item.rate2}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default RateTable;
