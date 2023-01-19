import { View, Text } from '@tarojs/components';
import './index.less';

type Props = {
  label: string;
  children: React.ReactNode;
};

const ListItem = ({ label, children }: Props) => {
  return (
    <View className="listItem">
      <Text className="label">{label}</Text>
      <View className="formItemCon">{children}</View>
    </View>
  );
};

export default ListItem;
