"use client";

import { useState, useEffect, useMemo, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import AppStepper from "../ui/AppStepper";

export interface StepConfig {
  id: string;
  label: string;
  component: ComponentType<{
    defaultValues?: Record<string, any>;
    onNext?: () => void;
    onPrev?: () => void;
  }>;
}

interface ProfileWizardProps {
  steps: StepConfig[];
  getProfileStatus: () => any;
  isLoading: boolean;
  refetchStatus: () => void;
  returnRoute?: string;
}

export default function ProfileWizard({
  steps,
  getProfileStatus,
  isLoading: profileStatusLoading,
  refetchStatus,
  returnRoute = "/dashboard"
}: ProfileWizardProps) {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(4);

  const profileStatus = getProfileStatus();

  // Determine initial step based on profile status
  useEffect(() => {
    if (profileStatus && currentStepIndex === null) {
      const completed = profileStatus.completedSections || [];

      // Find the first incomplete step
      let index = 0;
      let found = false;
      for (let i = 0; i < steps.length; i++) {
        if (!completed.includes(steps[i].id)) {
          index = i;
          found = true;
          break;
        }
      }

      if (!found && completed.length >= steps.length) {
        // All completed, default to last step
        index = steps.length - 1;
      }

      setCurrentStepIndex(index);
    }
  }, [profileStatus, currentStepIndex, steps]);

  const handleNext = () => {
    if (currentStepIndex === null) return;

    if (currentStepIndex === steps.length - 1) {
      router.push(returnRoute);
    } else {
      setCurrentStepIndex((prev) => (prev !== null ? prev + 1 : 0));
      window.scrollTo(0, 0);
    }

    refetchStatus(); // Refresh status
  };

  const handlePrev = () => {
    if (currentStepIndex === null) return;

    if (currentStepIndex === 0) {
      router.push(returnRoute);
    } else {
      setCurrentStepIndex((prev) => (prev !== null ? prev - 1 : 0));
      window.scrollTo(0, 0);
    }
  };

  // Calculate completed indices
  const completedIndices = useMemo(() => {
    if (!profileStatus?.completedSections) return [];
    return steps.reduce((acc: number[], step, index) => {
      if (profileStatus.completedSections.includes(step.id)) {
        acc.push(index);
      }
      return acc;
    }, []);
  }, [profileStatus, steps]);

  if (profileStatusLoading || currentStepIndex === null) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Spinner size="xl" color="orange.500" />
      </Flex>
    );
  }

  const CurrentStepComponent = steps[currentStepIndex].component;

  return (
    <Box pb={10}>
      <Box mb={8}>
        <AppStepper
          steps={steps.map(s => ({ id: s.id, label: s.label }))}
          activeStep={currentStepIndex}
          completedStepIndices={completedIndices}
        />
      </Box>

      <Box>
        <CurrentStepComponent
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </Box>
    </Box>
  );
}
