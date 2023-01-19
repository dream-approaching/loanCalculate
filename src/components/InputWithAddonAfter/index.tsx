import { View, Text, Input } from '@tarojs/components';
import type { InputProps } from '@tarojs/components/types/Input';
import React from 'react';
import './index.less';

type Props = {
  addonText: string;
  initialValue?: string;
} & InputProps;

const InputWithAddonAfter = ({ addonText, initialValue, ...rest }: Props) => {
  return (
    <View className="input-with-addon-after">
      <Input className="input" value={initialValue} {...rest} />
      <Text className="addon-after">{addonText}</Text>
    </View>
  );
};

export default React.memo(InputWithAddonAfter);
