"use client";

import { useState } from "react";
import DynamicForm from "../../ui/DynamicForm";
import { collegeProgramDetailsConfig } from "@/config/forms/collegeRegistrationDetailsForm";
import { trpc } from "@/lib/trpc";
import { toaster } from "../../ui/toaster";
import { Box } from "@chakra-ui/react";

export default function ProgramDetails({
  defaultValues,
  onNext,
  onPrev,
}: {
  defaultValues?: Record<string, any>;
  onNext?: () => void;
  onPrev?: () => void;
}) {
  const [formKey, setFormKey] = useState(0);
  const [initialValues, setInitialValues] = useState<Record<string, any>>(
    defaultValues || {
      selectedCourses: {
        diploma: [],
        undergraduate: [],
        postgraduate: [],
      },
    }
  );
  const utils = trpc.useUtils();

  const saveProgramDetails = trpc.college.saveProgramDetails.useMutation({
    onSuccess: () => {
      toaster.create({
        title: "Success",
        description: "Program details saved successfully",
        type: "success",
        duration: 3000,
      });
      utils.college.getProgramDetails.invalidate();
      utils.college.getProfileStatus.invalidate();
      onNext?.();
    },
    onError: (error) => {
      toaster.create({
        title: "Error",
        description: error.message || "Failed to save program details",
        type: "error",
        duration: 5000,
      });
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      // Transform selectedCourses object to array format if needed
      const selectedCoursesArray = Object.entries(data.selectedCourses || {})
        .flatMap(([type, courses]: [string, any]) =>
          courses.map((courseId: string) => ({ type, courseId }))
        );

      const payload = {
        selectedCourses: data.selectedCourses || {},
      };

      console.log("Program Details Data:", payload);

      // TODO: Uncomment when backend is ready
      // await saveProgramDetails.mutateAsync(payload);

      toaster.create({
        title: "Success",
        description: "Program details saved successfully",
        type: "success",
        duration: 2000,
      });

      onNext?.();
    } catch (error) {
      console.error("Error saving program details:", error);
      toaster.create({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save program details",
        type: "error",
        duration: 3000,
      });
    }
  };

  const handleFormChange = (name: string, value: any) => {
    setInitialValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box>
      <DynamicForm
        key={formKey}
        sections={collegeProgramDetailsConfig}
        onSubmit={handleSubmit}
        defaultValues={initialValues}
        submitButtonText="Save & Next"
        isSubmitting={saveProgramDetails.isPending}
        onChange={handleFormChange}
        previousButton={{
          label: "Previous",
          onClick: onPrev || (() => { }),
        }}
      />
    </Box>
  );
}

