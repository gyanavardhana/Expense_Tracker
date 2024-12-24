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
        <Text className={`text-base font-medium text-terinary mb-2 ${labelStyle}`}>
          {label}
        </Text>
        <View
          className={`flex-row items-center bg-white rounded-xl border-2 ${
            isFocused ? "border-secondary" : "border-primary"
          } ${errorMessage ? "border-red-500" : ""} ${containerStyle}`}
        >
          {icon && (
            <Image
              source={icon}
              className={`w-2 h-2 ml-4 opacity-70 ${iconStyle}`}
              resizeMode="contain"
            />
          )}
          <TextInput
            className={`py-3.5 px-4 flex-1 text-terinary text-base ${inputStyle}`}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholderTextColor="#967959"
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