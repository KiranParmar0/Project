"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  Grid,
  Input,
  Text,
  HStack,
  VStack,
  Flex,
  Field,
  NativeSelect,
  Textarea,
  Separator,
  Menu,
  Checkbox,
  Accordion,
  Table,
  Badge,
} from "@chakra-ui/react";
import VerifyMobileNumber from "@/components/forms/VerifyMobileNumber";

export type FieldType =
  | "text"
  | "email"
  | "number"
  | "tel"
  | "date"
  | "select"
  | "radio"
  | "checkbox"
  | "multiselect"
  | "textarea"
  | "courseMultiSelect";

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  description?: string;
  options?: Array<{ value: string | number; label: string }>;
  defaultValue?: any;
  validation?: z.ZodTypeAny;
  gridColumn?: string;
  rows?: number;
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "email" | "url";
  disabled?: boolean;
  // optional input restriction: 'alpha' allows only letters + spaces, 'numeric' allows only digits
  restrictInput?: "alpha" | "numeric";
  // Optional visibility rule: show this field only when another field matches the given value(s)
  // Can be a single condition or an array of conditions (all must be true)
  visibleWhen?:
  | {
    field: string;
    is?: any | any[];
  }
  | Array<{
    field: string;
    is?: any | any[];
  }>;
  // courseMultiSelect specific options
  categories?: Array<{
    type: string;
    label: string;
    courses: Array<{ id: string; name: string; pattern: string; duration: string }>;
  }>;
}

export interface FormSection {
  title: string;
  subtitle?: string;
  fields: FormFieldConfig[];
}

interface DynamicFormProps {
  sections: FormSection[];
  onSubmit: (data: any) => void | Promise<void>;
  onCancel?: () => void;
  defaultValues?: Record<string, any>;
  isSubmitting?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
  submitButtonText?: string;
  cancelButtonText?: string;
  showPreviousButton?: boolean;
  previousButton?: {
    label: string;
    onClick: () => void;
  };
  onChange?: (name: string, value: any, setValue?: (name: string, value: any) => void, getValues?: () => Record<string, any>) => void;
}

export default function DynamicForm({
  sections,
  onSubmit,
  onCancel,
  defaultValues = {},
  isSubmitting = false,
  submitLabel = "Save & Next",
  cancelLabel = "Cancel",
  showCancel = true,
  submitButtonText,
  cancelButtonText,
  onChange,
  showPreviousButton = true,
  previousButton,
}: DynamicFormProps) {
  const finalSubmitLabel = submitButtonText || submitLabel;
  const finalCancelLabel = cancelButtonText || cancelLabel;
  // Helper logic for visibility
  const evaluateVisibility = (
    condition: { field: string; is?: any | any[] } | Array<{ field: string; is?: any | any[] }>,
    data: Record<string, any>
  ): boolean => {
    const check = (c: { field: string; is?: any | any[] }) => {
      const val = data[c.field];
      if (Array.isArray(c.is)) return c.is.includes(val);
      if (c.is !== undefined) return val === c.is;
      return !!val;
    };

    if (Array.isArray(condition)) {
      return condition.every(check);
    }
    return check(condition);
  };

  // Build Zod schema dynamically
  const schemaFields: Record<string, z.ZodTypeAny> = {};
  const conditionalFields: Array<{ name: string; schema: z.ZodTypeAny; rule: any }> = [];

  sections.forEach((section) => {
    section.fields.forEach((field) => {
      let fieldSchema: z.ZodTypeAny;

      if (field.validation) {
        fieldSchema = field.validation;
      } else {
        switch (field.type) {
          case "email":
            fieldSchema = z.string().email("Invalid email address");
            break;
          case "number":
            fieldSchema = z.coerce.number();
            break;
          case "tel":
            fieldSchema = z.string().regex(/^\+?[\d\s-()]+$/, "Invalid phone number");
            break;
          case "multiselect":
            fieldSchema = z.array(z.string());
            break;
          case "checkbox":
            fieldSchema = z.boolean();
            break;
          default:
            fieldSchema = z.string();
        }

        if (field.required) {
          if (field.type === "checkbox") {
            fieldSchema = fieldSchema.refine((val) => val === true, {
              message: "This field is required",
            });
          } else if (field.type === "number") {
            // For numbers, handle NaN which z.coerce.number() produces for invalid strings
            fieldSchema = (fieldSchema as z.ZodNumber).refine((val) => !isNaN(val), {
              message: "This field is required",
            });
          } else {
            fieldSchema = (fieldSchema as z.ZodString).min(1, "This field is required");
          }
        } else {
          fieldSchema = fieldSchema.optional();
        }
      }

      if (field.visibleWhen) {
        // If conditional, use optional/any in the base object to parse everything, 
        // then strict validate in superRefine
        schemaFields[field.name] = z.any().optional();
        conditionalFields.push({ name: field.name, schema: fieldSchema, rule: field.visibleWhen });
      } else {
        schemaFields[field.name] = fieldSchema;
      }
    });
  });

  const schema = z.object(schemaFields).superRefine((data, ctx) => {
    conditionalFields.forEach(({ name, schema, rule }) => {
      if (evaluateVisibility(rule, data)) {
        const result = schema.safeParse(data[name]);
        if (!result.success) {
          result.error.issues.forEach((issue) => {
            ctx.addIssue({
              ...issue,
              path: [name, ...issue.path],
            });
          });
        }
      }
    });
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  console.log("form errors", errors);

  const titleCase = (s: string) =>
    String(s || "")
      .split(" ")
      .filter(Boolean)
      .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ""))
      .join(" ");

  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [pendingMobile, setPendingMobile] = useState<string | null>(null);

  const openOtpModal = (mobile?: string) => {
    const m = mobile || getValues().mobileNumber || "";
    setPendingMobile(m);
    setIsOtpOpen(true);
  };

  const closeOtpModal = () => {
    setIsOtpOpen(false);
    setOtpValue("");
    setPendingMobile(null);
  };

  const sendOtp = () => {
    // Placeholder: integrate with SMS/OTP API
    console.log("Send OTP to", pendingMobile);
  };

  const verifyOtp = () => {
    // Placeholder: verify OTP with backend
    console.log("Verify OTP", otpValue, "for", pendingMobile);
    // mark as verified in form state if desired
    setValue("mobileVerified", true);
    closeOtpModal();
  };

  const renderField = (field: FormFieldConfig) => {
    const error = errors[field.name]?.message as string | undefined;

    const handleAlphaKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const allowedKeys = [
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
        "Delete",
        " ",
        "Spacebar",
      ];
      if (allowedKeys.includes(e.key)) return;
      if (e.ctrlKey || e.metaKey) return; // allow copy/paste shortcuts
      if (!/^[a-zA-Z ]$/.test(e.key)) e.preventDefault();
    };

    const handleNumericKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const allowedKeys = [
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
        "Delete",
      ];
      if (allowedKeys.includes(e.key)) return;
      if (e.ctrlKey || e.metaKey) return; // allow copy/paste shortcuts
      if (!/^[0-9]$/.test(e.key)) e.preventDefault();
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, mode?: "alpha" | "numeric") => {
      const text = e.clipboardData.getData("text");
      if (mode === "alpha" && !/^[A-Za-z\s]+$/.test(text)) e.preventDefault();
      if (mode === "numeric" && !/^\d+$/.test(text)) e.preventDefault();
    };

    switch (field.type) {
      case "select":
        return (
          <Field.Root key={field.name} invalid={!!error}>
            <Field.Label fontSize="sm" fontWeight={600}>
              {field.label}
              {field.required && <span style={{ color: "red" }}> *</span>}
            </Field.Label>
            <NativeSelect.Root size="md">
              <NativeSelect.Field
                disabled={field.disabled}
                {...register(field.name, {
                  onChange: (e) => {
                    const val = e.target.value;
                    onChange?.(field.name, val, setValue, getValues);
                    // For permanent address country field
                    if (field.name === "p_country") {
                      if (val === "IN") {
                        setValue("p_state", "1", { shouldValidate: true, shouldDirty: true });
                      }
                    }
                  },
                })}
                borderColor="gray.300"
              >
                <option value="">{field.placeholder || `Select ${field.label}`}</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            {error && <Field.ErrorText fontSize="xs">{error}</Field.ErrorText>}
            {field.description && (
              <Field.HelperText fontSize="xs" color="gray.500">
                {field.description}
              </Field.HelperText>
            )}
          </Field.Root>
        );

      case "radio":
        return (
          <Field.Root key={field.name} invalid={!!error}>
            <Field.Label fontSize="sm" fontWeight={600}>
              {field.label}
              {field.required && <span style={{ color: "red" }}> *</span>}
            </Field.Label>
            <HStack gap={6}>
              {field.options?.map((option) => (
                <label
                  key={option.value}
                  style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}
                >
                  <input
                    type="radio"
                    value={String(option.value)}
                    {...register(field.name, {
                      onChange: (e) => {
                        const val = e.target.value;
                        onChange?.(field.name, val, setValue, getValues);
                        // When nationality is set to Indian, auto-select Maharashtra
                        if (field.name === "nationality") {
                          if (val === "I") {
                            setValue("state", "1", { shouldValidate: true, shouldDirty: true });
                          }
                        }
                      },
                    })}
                  />
                  {option.label}
                </label>
              ))}
            </HStack>
            {error && <Field.ErrorText fontSize="xs">{error}</Field.ErrorText>}
            {field.description && (
              <Field.HelperText fontSize="xs" color="gray.500">
                {field.description}
              </Field.HelperText>
            )}
          </Field.Root>
        );

      case "multiselect":
        return (
          <Field.Root key={field.name} invalid={!!error}>
            <Field.Label fontSize="sm" fontWeight={600}>
              {field.label}
              {field.required && <span style={{ color: "red" }}> *</span>}
            </Field.Label>
            <Menu.Root closeOnSelect={false}>
              <Menu.Trigger asChild>
                <Button size="md" variant="outline">
                  {Array.isArray(watch(field.name)) && watch(field.name).length
                    ? `${watch(field.name).length} selected`
                    : field.placeholder || `Select ${field.label}`}
                </Button>
              </Menu.Trigger>
              <Menu.Content>
                {field.options?.map((opt) => {
                  const selected = (watch(field.name) || []).includes(String(opt.value));
                  return (
                    <Menu.Item
                      key={opt.value}
                      value={String(opt.value)}
                      onClick={() => {
                        const currentValues = watch(field.name) || [];
                        const strValue = String(opt.value);
                        const newValues = currentValues.includes(strValue)
                          ? currentValues.filter((v: string) => v !== strValue)
                          : [...currentValues, strValue];
                        setValue(field.name, newValues, { shouldValidate: true, shouldDirty: true });
                        onChange?.(field.name, newValues, setValue, getValues);
                      }}
                    >
                      <HStack justify="space-between" width="100%">
                        <Text>{opt.label}</Text>
                        {selected && <Text color="green.500">✓</Text>}
                      </HStack>
                    </Menu.Item>
                  );
                })}
              </Menu.Content>
            </Menu.Root>
            {error && <Field.ErrorText fontSize="xs">{error}</Field.ErrorText>}
            {field.description && (
              <Field.HelperText fontSize="xs" color="gray.500">
                {field.description}
              </Field.HelperText>
            )}
          </Field.Root>
        );

      case "checkbox":
        return (
          <Field.Root key={field.name} invalid={!!error}>
            <Checkbox.Root
              checked={watch(field.name) || false}
              onCheckedChange={(checked) => {
                setValue(field.name, checked.checked);
                onChange?.(field.name, checked.checked, setValue, getValues);
              }}
              disabled={field.disabled}
            >
              <Checkbox.Control />
              <Checkbox.Label fontSize="sm" fontWeight={400} color="gray.700">
                {field.label}
                {field.required && <span style={{ color: "red" }}> *</span>}
              </Checkbox.Label>
            </Checkbox.Root>
            {error && <Field.ErrorText fontSize="xs">{error}</Field.ErrorText>}
            {field.description && (
              <Field.HelperText fontSize="xs" color="gray.500">
                {field.description}
              </Field.HelperText>
            )}
          </Field.Root>
        );

      case "textarea":
        return (
          <Field.Root key={field.name} invalid={!!error}>
            <Field.Label fontSize="sm" fontWeight={600}>
              {field.label}
              {field.required && <span style={{ color: "red" }}> *</span>}
            </Field.Label>
            <Textarea
              {...register(field.name)}
              placeholder={field.placeholder}
              rows={field.rows || 3}
              borderColor="gray.300"
            />
            {error && <Field.ErrorText fontSize="xs">{error}</Field.ErrorText>}
            {field.description && (
              <Field.HelperText fontSize="xs" color="gray.500">
                {field.description}
              </Field.HelperText>
            )}
          </Field.Root>
        );

      case "courseMultiSelect":
        return (
          <Field.Root key={field.name} invalid={!!error}>
            <Text fontSize="md" fontWeight="600" color="orange.500" mb={2}>
              {field.label}
              {field.required && <span style={{ color: "red" }}> *</span>}
            </Text>
            <Separator mb={4} />
            <Accordion.Root
              multiple
              defaultValue={field.categories?.map((cat: any) => cat.type) || []}
            >
              {field.categories?.map((category: any) => {
                const categoryValue = watch(field.name) || {};
                const selectedCourses: string[] = categoryValue[category.type] || [];
                const selectedCount = selectedCourses.length;
                const allSelected = selectedCourses.length === category.courses.length;

                return (
                  <Accordion.Item key={category.type} value={category.type}>
                    <Accordion.ItemTrigger _open={{ bg: "gray.50" }}>
                      <Flex justify="space-between" width="full" align="center" gap={4}>
                        <Flex align="center" gap={3} flex={1}>
                          <Text fontSize="sm" fontWeight={600} color="gray.700">
                            {category.label}
                          </Text>
                          <Badge
                            colorPalette={selectedCount > 0 ? "yellow" : "gray"}
                            variant="subtle"
                            fontSize="xs"
                          >
                            {selectedCount > 0 ? (
                              <span>
                                {selectedCount > 1 ? `${selectedCount} Courses` : "1 Course"} Selected
                              </span>
                            ) : (
                              "0 Courses Selected"
                            )}
                          </Badge>
                        </Flex>
                        <Accordion.ItemIndicator />
                      </Flex>
                    </Accordion.ItemTrigger>

                    <Accordion.ItemContent>
                      <Accordion.ItemBody>
                        <Box overflowX="auto" mt={4} mb={4}>
                          <Table.Root size="sm" variant="outline">
                            <Table.Header>
                              <Table.Row bg="gray.50">
                                <Table.ColumnHeader width="50px">
                                  <Checkbox.Root
                                    checked={allSelected}
                                    onCheckedChange={(checked: any) => {
                                      const newValue = {
                                        ...categoryValue,
                                        [category.type]: checked.checked
                                          ? category.courses.map((c: any) => c.id)
                                          : [],
                                      };
                                      setValue(field.name, newValue);
                                      onChange?.(field.name, newValue, setValue, getValues);
                                    }}
                                  >
                                    <Checkbox.Control cursor="pointer" />
                                  </Checkbox.Root>
                                </Table.ColumnHeader>
                                <Table.ColumnHeader fontSize="sm" fontWeight={600} color="gray.700">
                                  Course Name
                                </Table.ColumnHeader>
                                <Table.ColumnHeader fontSize="sm" fontWeight={600} color="gray.700">
                                  Pattern
                                </Table.ColumnHeader>
                                <Table.ColumnHeader fontSize="sm" fontWeight={600} color="gray.700">
                                  Duration
                                </Table.ColumnHeader>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {category.courses.map((course: any) => {
                                const isSelected = selectedCourses.includes(course.id);
                                return (
                                  <Table.Row
                                    key={course.id}
                                    onClick={() => {
                                      const newSelected = isSelected
                                        ? selectedCourses.filter((id: string) => id !== course.id)
                                        : [...selectedCourses, course.id];
                                      const newValue = {
                                        ...categoryValue,
                                        [category.type]: newSelected,
                                      };
                                      setValue(field.name, newValue);
                                      onChange?.(field.name, newValue, setValue, getValues);
                                    }}
                                    cursor="pointer"
                                    _hover={{ bg: "gray.50" }}
                                  >
                                    <Table.Cell cursor="pointer" onClick={(e) => e.stopPropagation()}>
                                      <Checkbox.Root
                                        checked={isSelected}
                                        onCheckedChange={(checked: any) => {
                                          const newSelected = checked.checked
                                            ? [...selectedCourses, course.id]
                                            : selectedCourses.filter((id: string) => id !== course.id);
                                          const newValue = {
                                            ...categoryValue,
                                            [category.type]: newSelected,
                                          };
                                          setValue(field.name, newValue);
                                          onChange?.(field.name, newValue, setValue, getValues);
                                        }}
                                      >
                                        <Checkbox.Control cursor="pointer" />
                                      </Checkbox.Root>
                                    </Table.Cell>
                                    <Table.Cell fontSize="sm" color="gray.700">
                                      {course.name}
                                    </Table.Cell>
                                    <Table.Cell fontSize="sm" color="gray.700">
                                      {course.pattern}
                                    </Table.Cell>
                                    <Table.Cell fontSize="sm" color="gray.700">
                                      {course.duration}
                                    </Table.Cell>
                                  </Table.Row>
                                );
                              })}
                            </Table.Body>
                          </Table.Root>
                        </Box>
                      </Accordion.ItemBody>
                    </Accordion.ItemContent>
                  </Accordion.Item>
                );
              })}
            </Accordion.Root>
            {error && <Field.ErrorText fontSize="xs" mt={2}>{error}</Field.ErrorText>}
            {field.description && (
              <Field.HelperText fontSize="xs" color="gray.500" mt={2}>
                {field.description}
              </Field.HelperText>
            )}
          </Field.Root>
        );

      default:
        // For mobileNumber, show a Verify button next to the input
        if (field.name === "mobileNumber") {
          return (
            <Field.Root key={field.name} invalid={!!error}>
              <Field.Label fontSize="sm" fontWeight={600}>
                {field.label}
                {field.required && <span style={{ color: "red" }}> *</span>}
              </Field.Label>
              <HStack>
                <Input
                  {...register(field.name, {
                    onChange: (e) => {
                      // normalize to digits only and enforce max 10 chars
                      const raw = (e.target as HTMLInputElement).value.replace(/\D/g, "").slice(0, 10);
                      // reset verification whenever number changes
                      setValue("mobileVerified", false, { shouldValidate: false, shouldDirty: true });
                      setValue(field.name, raw, { shouldValidate: true, shouldDirty: true });
                      onChange?.(field.name, raw, setValue, getValues);
                    },
                  })}
                  type={field.type}
                  placeholder={field.placeholder}
                  size="md"
                  maxLength={10}
                  borderColor="gray.300"
                  inputMode={field.inputMode}
                  disabled={field.disabled}
                  onKeyDown={
                    field.restrictInput === "alpha"
                      ? handleAlphaKeyDown
                      : field.restrictInput === "numeric"
                        ? handleNumericKeyDown
                        : undefined
                  }
                  onPaste={(e) => field.restrictInput && handlePaste(e, field.restrictInput)}
                />
                {/* Show green verified text instead of Verify button when verified */}
                {Boolean(watch("mobileVerified") || getValues().mobileVerified) ? (
                  <Text color="green.600" fontWeight={600}>
                    Verified
                  </Text>
                ) : (
                  <Button size="sm" onClick={() => openOtpModal(getValues().mobileNumber)}>
                    Verify
                  </Button>
                )}
              </HStack>
              {error && <Field.ErrorText fontSize="xs">{error}</Field.ErrorText>}
              {field.description && (
                <Field.HelperText fontSize="xs" color="gray.500">
                  {field.description}
                </Field.HelperText>
              )}
            </Field.Root>
          );
        }

        return (
          <Field.Root key={field.name} invalid={!!error}>
            <Field.Label fontSize="sm" fontWeight={600}>
              {field.label}
              {field.required && <span style={{ color: "red" }}> *</span>}
            </Field.Label>
            <Input
              {...register(field.name, {
                onChange: (e) => {
                  const val = (e.target as HTMLInputElement).value;

                  // If user types the very first character into an alpha field, capitalize it immediately
                  const alphaNames = [
                    "firstName",
                    "middleName",
                    "lastName",
                    "fullName",
                    "fatherName",
                    "fatherOccupation",
                    "motherName",
                    "motherTongue",
                  ];

                  if ((field.restrictInput === "alpha" || alphaNames.includes(field.name)) && val.length === 1) {
                    const firstCap = titleCase(val);
                    if (firstCap !== val) {
                      setValue(field.name, firstCap, { shouldValidate: true, shouldDirty: true });
                      onChange?.(field.name, firstCap, setValue, getValues);
                      // Also update fullName when typing first name
                      if (field.name === "firstName") {
                        const values = getValues();
                        const parts = [firstCap, values.middleName, values.lastName]
                          .filter(Boolean)
                          .map((s: any) => String(s).trim());
                        setValue("fullName", titleCase(parts.join(" ")), { shouldValidate: true, shouldDirty: true });
                      }
                      return;
                    }
                  }

                  // For numeric-restricted special fields, limit to 10 digits
                  if (field.name === "whatsappNumber" && field.restrictInput === "numeric") {
                    const raw = val.replace(/\D/g, "").slice(0, 10);
                    setValue(field.name, raw, { shouldValidate: true, shouldDirty: true });
                    onChange?.(field.name, raw, setValue, getValues);
                    return;
                  }

                  if (field.name === "aadharNumber" && field.restrictInput === "numeric") {
                    const raw = val.replace(/\D/g, "").slice(0, 12);
                    // Only trigger validation when 12 digits are entered
                    const shouldValidate = raw.length === 12;
                    setValue(field.name, raw, { shouldValidate, shouldDirty: true });
                    onChange?.(field.name, raw, setValue, getValues);
                    return;
                  }

                  // Do not force-format on every keystroke (avoids caret jumps).
                  onChange?.(field.name, val, setValue, getValues);

                  // Update fullName live (formatting applied to fullName only)
                  if (field.name === "firstName" || field.name === "middleName" || field.name === "lastName") {
                    const values = getValues();
                    const parts = [
                      field.name === "firstName" ? val : values.firstName,
                      field.name === "middleName" ? val : values.middleName,
                      field.name === "lastName" ? val : values.lastName,
                    ]
                      .filter(Boolean)
                      .map((s: any) => String(s).trim());
                    const full = parts.join(" ");
                    setValue("fullName", titleCase(full), { shouldValidate: true, shouldDirty: true });
                  }
                },
                onBlur: (e) => {
                  // Apply Title Case on blur for alpha fields to avoid interrupting typing
                  const alphaNames = [
                    "firstName",
                    "middleName",
                    "lastName",
                    "fullName",
                    "fatherName",
                    "fatherOccupation",
                    "motherName",
                    "motherTongue",
                  ];
                  const val = (e.target as HTMLInputElement).value;
                  if (field.restrictInput === "alpha" || alphaNames.includes(field.name)) {
                    const formatted = titleCase(val);
                    if (formatted !== val) {
                      setValue(field.name, formatted, { shouldValidate: true, shouldDirty: true });
                    }
                  }
                },
              })}
              type={field.type}
              placeholder={field.placeholder}
              size="md"
              maxLength={field.name === "aadharNumber" ? 12 : undefined}
              borderColor="gray.300"
              inputMode={field.inputMode}
              disabled={field.disabled}
              onKeyDown={
                field.restrictInput === "alpha"
                  ? handleAlphaKeyDown
                  : field.restrictInput === "numeric"
                    ? handleNumericKeyDown
                    : undefined
              }
              onPaste={(e) => field.restrictInput && handlePaste(e, field.restrictInput)}
            />
            {error && <Field.ErrorText fontSize="xs">{error}</Field.ErrorText>}
            {field.description && (
              <Field.HelperText fontSize="xs" color="gray.500">
                {field.description}
              </Field.HelperText>
            )}
          </Field.Root>
        );
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      bg="white"
      borderRadius="lg"
      p={{ base: 2, md: 4 }}
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.100"
    >
      <VStack gap={8} align="stretch">
        {sections.map((section, index) => (
          <Box key={index}>
            <Text
              fontSize="md"
              fontWeight={600}
              color="orange.500"
              mb={section.subtitle ? 1 : 2}
            >
              {section.title}
            </Text>
            <Separator mt={2} mb={4} />
            {section.subtitle && (
              <Text fontSize="sm" color="gray.600" mb={4}>
                {section.subtitle}
              </Text>
            )}

            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(auto-fit, minmax(250px, 1fr))",
              }}
              gap={4}
            >
              {section.fields.map((field) => {
                // Evaluate visibility rules (if any). Support a single condition or an array of conditions (AND).
                let visible = true;
                if (field.visibleWhen) {
                  const evalCond = (cond: { field: string; is?: any | any[] }) => {
                    const watcher = watch(cond.field);
                    if (Array.isArray(cond.is)) return cond.is.includes(watcher);
                    if (cond.is !== undefined) return watcher === cond.is;
                    return !!watcher;
                  };

                  if (Array.isArray(field.visibleWhen)) {
                    visible = field.visibleWhen.every((c) => evalCond(c));
                  } else {
                    visible = evalCond(field.visibleWhen);
                  }
                }

                if (!visible) return null;

                return (
                  <Box key={field.name} gridColumn={field.gridColumn}>
                    {renderField(field)}
                  </Box>
                );
              })}
            </Grid>
          </Box>
        ))}

        <Separator />

        <Flex justify="space-between" pt={4}>
          <HStack gap={2}>
            {showPreviousButton && previousButton && (
              <Button
                type="button"
                onClick={previousButton.onClick}
                variant="outline"
                size="md"
                borderRadius="6px"
                px={6}
                borderColor="black"
                colorPalette="black"
              >
                {previousButton.label}
              </Button>
            )}
            {showCancel && onCancel && (
              <Button
                type="button"
                onClick={onCancel}
                variant="outline"
                size="md"
                borderRadius="6px"
                px={6}
              >
                {finalCancelLabel}
              </Button>
            )}
          </HStack>

          <Button
            type="submit"
            bg="gray.800"
            color="white"
            size="md"
            borderRadius="6px"
            px={6}
            loading={isSubmitting}
            _hover={{ bg: "gray.700" }}
          >
            {finalSubmitLabel}
          </Button>
        </Flex>
      </VStack>
      {isOtpOpen && (
        <Box position="fixed" inset={0} bg="blackAlpha.600" zIndex={9999} display="flex" alignItems="center" justifyContent="center">
          <Box>
            <VerifyMobileNumber
              mobile={pendingMobile || undefined}
              embedded={true}
              onVerify={(otp) => {
                // called when OTP verified inside the child component
                console.log("OTP verified for", pendingMobile, "otp:", otp);
                setValue("mobileVerified", true);
                closeOtpModal();
              }}
              onResend={() => {
                sendOtp();
              }}
              onClose={() => {
                closeOtpModal();
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

// OTP Modal placed after component to keep component code tidy
// (Modal JSX needs access to isOtpOpen, etc. — keep inside component if preferred.)
