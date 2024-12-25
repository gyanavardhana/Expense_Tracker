import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInputProps,
  TouchableOpacity,
  ImageStyle,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useState } from "react";

interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  errorMessage?: string;
}

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  errorMessage,
  ...props
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className="mb-4 w-full">
      <Text className={`text-base font-bold text-terinary mb-4 ${labelStyle}`}>
        {label}
      </Text>
      <View
        className={`flex-row items-center justify-start rounded-xl border-2 border-secondary"
        } ${errorMessage ? "border-red-500" : ""} ${containerStyle}`}
      >
          {icon && (
            <Image
              source={icon}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          )}

        <TextInput
          className={`py-3.5 px-4 flex-1 text-terinary text-left ${inputStyle}`}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor="#221C0F"
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            className="px-4"
          >
            <Text className="text-secondary">
              {isPasswordVisible ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <Text className="text-red-500 text-sm mt-1">{errorMessage}</Text>
      )}
    </View>
  );
};

export default InputField;
