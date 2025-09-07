"use client";
/* eslint-disable react/no-children-prop */
import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomProps, FormFieldType, RenderFieldProps } from "@/types";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { GenderOptions, yesOrNoOptions } from "@/constants";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import FileUploader from "./FileUploader";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";

const RenderField = ({
  field,
  fieldType,
  iconSrc,
  iconAlt,
  placeholder,
  name,
  disabled,
  subCategory,
  children,
  label,
  labelUrdu,
}: RenderFieldProps) => {
  const [open, setOpen] = React.useState(false);
  const formatCNIC = (value: string) => {
    // Remove non-digits
    const cleaned = value.replace(/\D/g, "");
    // Apply CNIC pattern: 5-7-1
    let formatted = cleaned;
    if (cleaned.length > 5 && cleaned.length <= 12) {
      formatted = `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    }
    if (cleaned.length > 12) {
      formatted = `${cleaned.slice(0, 5)}-${cleaned.slice(
        5,
        12
      )}-${cleaned.slice(12, 13)}`;
    }
    return formatted;
  };

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              name={name}
              autoComplete="off"
              {...field}
              className="shad-input border-0 text-white"
              disabled={disabled}
            />
          </FormControl>
        </div>
      );
      break;
    case FormFieldType.CNIC:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder || "35202-1234567-1"}
              name={name}
              autoComplete="off"
              value={field.value || ""}
              onChange={(e) => field.onChange(formatCNIC(e.target.value))}
              className="shad-input border-0 text-white"
              disabled={disabled}
            />
          </FormControl>
        </div>
      );
      break;
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="PK"
            placeholder={placeholder}
            international
            withCountryCallingCode={false}
            value={field.value || ""} // ✅ Use field.value
            onChange={field.onChange}
            className="input-phone text-white"
            disabled={disabled}
            autoComplete="off"
          />
        </FormControl>
      );
      break;
    case FormFieldType.DATE_PICKER:
      return (
        <div className="w-full py-1 flex rounded-md border border-border bg-background items-center">
          {/* Left calendar icon */}
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2"
          />

          {/* Date Picker */}
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-left font-normal"
                >
                  {field.value
                    ? field.value.toLocaleDateString()
                    : "Select date"}
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto rounded-xl border bg-popover p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setOpen(false);
                  }}
                  captionLayout="dropdown"
                  fromYear={1920}
                  toYear={new Date().getFullYear()}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
        </div>
      );

      break;
    case FormFieldType.YESORNO:
      return (
        <FormControl>
          <RadioGroup
            className="flex h-11 gap-6 xl:justify-between"
            onValueChange={field.onChange}
            value={field.value || ""} // ✅ bind directly to field.value
          >
            {yesOrNoOptions.map((option) => {
              const optionId = `${name}-${option}`;
              return (
                <div key={optionId} className="radio-group">
                  <RadioGroupItem value={option} id={optionId} />
                  <Label
                    htmlFor={optionId}
                    className="cursor-pointer text-white"
                  >
                    {option}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </FormControl>
      );
      break;
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select
            onValueChange={field.onChange}
            value={field.value || ""} // ✅ bind directly to field.value
            autoComplete="off"
          >
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {children} {/* Nest the children here */}
            </SelectContent>
          </Select>
        </FormControl>
      );
      break;
    case FormFieldType.SKELETON:
      if (subCategory === "radio") {
        return (
          <FormControl>
            <RadioGroup
              className="flex h-11 gap-6 xl:justify-between"
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              {GenderOptions.map((option, i) => (
                <div key={option + i} className="radio-group">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="cursor-pointer text-white">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
        );
      } else if (subCategory === "fileSelector") {
        return (
          <FormControl>
            <FileUploader
              onChange={(newFiles) => field.onChange(newFiles)}
              files={field.value || []}
              initialUrls={field.value || []} // ✅ pass existing URLs as initialUrls
            />
          </FormControl>
        );
      }
      break;
    // For controlled behavior

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={disabled}
            autoComplete="off"
          />
        </FormControl>
      );
      break;
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={name} className="checkbox-label text-white">
              {label}
            </label>
          </div>
        </FormControl>
      );
      break;
    case FormFieldType.TERMS:
      return (
        <FormControl>
          <div className="flex items-start gap-4 w-full">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className="mt-4"
            />
            <div className="flex flex-col gap-6 w-full">
              <label
                htmlFor={name}
                style={{ fontSize: "1.2rem", lineHeight: "30px" }}
                className="checkbox-label text-white urdu-text text-[1.4rem] leading-[30px] font-semibold text-right"
              >
                {label}
              </label>
              <label
                htmlFor={name}
                style={{ fontSize: "1.2rem", lineHeight: "50px" }}
                className="checkbox-label leading-[30px] text-white urdu-text text-lg font-semibold text-right"
              >
                {labelUrdu}
              </label>
              <hr className="border-t border-gray-600 my-2 w-full" />
            </div>
          </div>
        </FormControl>
      );
      break;

    default:
      break;
  }
};

const CustomFormField = ({
  control,
  fieldType,
  name,
  placeholder,
  label,
  labelUrdu,
  iconSrc,
  iconAlt,
  children,
  disabled,
  subCategory,
  value,
  showTimeSelect,
}: CustomProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {/* Show labels ONLY if not CHECKBOX and not TERMS */}
          {fieldType !== FormFieldType.CHECKBOX &&
            fieldType !== FormFieldType.TERMS &&
            (label || labelUrdu) && (
              <div className="flex justify-between items-center mb-1">
                <FormLabel className="text-white">{label}</FormLabel>
                {labelUrdu && (
                  <FormLabel className="text-white urdu-text text-right mr-2 mb-2">
                    {labelUrdu}
                  </FormLabel>
                )}
              </div>
            )}

          <RenderField
            field={field}
            value={value}
            fieldType={fieldType}
            iconSrc={iconSrc}
            placeholder={placeholder}
            name={name}
            iconAlt={iconAlt}
            control={control}
            children={children}
            disabled={disabled}
            subCategory={subCategory}
            label={label}
            labelUrdu={labelUrdu}
            showTimeSelect={showTimeSelect}
          />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
