import { z } from "zod";
import { FormSection } from "@/components/ui/DynamicForm";

// Shared address options
const countryOptions = [
  { value: "UK", label: "UK" },
  { value: "UAE", label: "UAE" },
  { value: "USA", label: "USA" },
  { value: "IN", label: "India" },
];

const stateOptions = [
  { value: "1", label: "Maharashtra" },
  { value: "2", label: "Karnataka" },
];

const districtOptions = [
  { value: "1", label: "Mumbai" },
  { value: "2", label: "Pune" },
];

// Verhoeff checksum validation for Aadhaar
function verhoeffValidate(num: string) {
  const d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  ];
  const p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
  ];
  let c = 0;
  const digits = num
    .split("")
    .reverse()
    .map((ch) => parseInt(ch, 10));
  for (let i = 0; i < digits.length; i++) {
    c = d[c][p[i % 8][digits[i]]];
  }
  return c === 0;
}

export const personalDetailsConfig: FormSection[] = [
  {
    title: "Basic Details:",
    fields: [
      {
        name: "parentInstitution",
        label: "Parent Institution (Sanstha Name)",
        type: "text",
        placeholder: "Parent Institution",
        required: true,
        gridColumn: "1 / -1",
        validation: z
          .string()
          .min(2, "Parent institution name must be at least 2 characters")
          .max(200, "Parent institution name must not exceed 200 characters"),
      },
      {
        name: "collegeName",
        label: "College Name",
        type: "text",
        placeholder: "College Name",
        required: true,
        gridColumn: "1 / -1",
        validation: z
          .string()
          .min(2, "College name must be at least 2 characters")
          .max(200, "College name must not exceed 200 characters"),
      },
      {
        name: "collegePopularName",
        label: "College Popular Name",
        type: "text",
        gridColumn: "1 / -1",
        placeholder: "Enter Popular Name",
        required: true,
        validation: z
          .string()
          .min(2, "Popular name must be at least 2 characters")
          .max(200, "Popular name must not exceed 200 characters"),
      },
      {
        name: "collegeEstablishmentYear",
        label: "College Establishment Year",
        type: "text",
        placeholder: "Enter Year",
        required: true,
        inputMode: "numeric",
        validation: z
          .string()
          .regex(/^\d{4}$/, "Please enter a valid 4-digit year")
          .refine((year) => {
            const yearNum = parseInt(year);
            const currentYear = new Date().getFullYear();
            return yearNum >= 1800 && yearNum <= currentYear;
          }, "Year must be between 1800 and current year"),
        restrictInput: "numeric",
      },
      {
        name: "universityName",
        label: "University Name",
        type: "select",
        placeholder: "VNMKV University",
        required: true,
        options: [
          { value: "VNMKV", label: "VNMKV University" },
          { value: "Other", label: "Other University" },
        ],
      },
      {
        name: "collegeType",
        label: "College Type",
        type: "select",
        placeholder: "Select Type",
        required: true,
        options: [
          { value: "aided", label: "Aided" },
          { value: "unaided", label: "Unaided" },
          { value: "government", label: "Government" },
          { value: "private", label: "Private" },
        ],
      },
      {
        name: "typeOfCollege",
        label: "Select Type of College:",
        type: "radio",
        required: true,
        gridColumn: "1 / 2",
        options: [
          { value: "girls", label: "Girls" },
          { value: "boys", label: "Boys" },
          { value: "coed", label: "Co-Ed" },
        ],
      },
      {
        name: "collegeCategory",
        label: "Select College Category:",
        type: "radio",
        gridColumn: "/-1",
        required: true,

        options: [
          { value: "school", label: "School" },
          { value: "polytechnic", label: "Polytechnic" },
          { value: "universityDepartment", label: "University Department" },
        ],
      },
      {
        name: "collegeStatus",
        label: "College Status",
        type: "select",
        placeholder: "Select Status",
        gridColumn: "1 / 5",
        required: true,
        options: [
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "underConstruction", label: "Under Construction" },
        ],
      },
      {
        name: "isAutonomous",
        label: "Is the college autonomous?",
        type: "radio",
        required: true,
        gridColumn: "1 / -1",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        name: "belongsToMinority",
        label: "Do you belong to any 'Minority' community?",
        type: "radio",
        required: false,
        gridColumn: "1 / -1",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        name: "minorityType",
        label: "If Yes, please select the type of minority.",
        type: "radio",
        required: false,
        gridColumn: "1 / -1",
        visibleWhen: { field: "belongsToMinority", is: "yes" },
        options: [
          { value: "religious", label: "Religious Minority" },
          { value: "linguistic", label: "Linguistic Minority" },
          { value: "both", label: "Both" },
        ],
      },
      {
        name: "religiousMinority",
        label: "Religious Minority",
        type: "select",
        placeholder: "Select",
        required: false,
        visibleWhen: [
          { field: "belongsToMinority", is: "yes" },
          { field: "minorityType", is: ["religious", "both"] },
        ],
        options: [
          { value: "muslim", label: "Muslim" },
          { value: "christian", label: "Christian" },
          { value: "sikh", label: "Sikh" },
          { value: "buddhist", label: "Buddhist" },
          { value: "jain", label: "Jain" },
          { value: "zoroastrian", label: "Zoroastrian (Parsi)" },
        ],
      },
      {
        name: "linguisticMinority",
        label: "Linguistic Minority",
        type: "select",
        placeholder: "Select Category",
        required: false,
        visibleWhen: [
          { field: "belongsToMinority", is: "yes" },
          { field: "minorityType", is: ["linguistic", "both"] },
        ],
        options: [
          { value: "urdu", label: "Urdu" },
          { value: "sindhi", label: "Sindhi" },
          { value: "other", label: "Other" },
        ],
      },
      {
        name: "affiliationNo",
        label: "Affiliation No",
        type: "text",
        placeholder: "No.",
        required: true,
        validation: z
          .string()
          .min(1, "Affiliation number is required")
          .max(50, "Affiliation number must not exceed 50 characters"),
      },
      {
        name: "affiliationType",
        label: "Affiliation Type",
        type: "select",
        placeholder: "Select Type",
        required: true,
        options: [
          { value: "permanent", label: "Permanent" },
          { value: "temporary", label: "Temporary" },
          { value: "provisional", label: "Provisional" },
        ],
      },
      {
        name: "affiliationStartDate",
        label: "Affiliation Start Date",
        type: "date",
        placeholder: "Select Date",
        required: true,
      },
      {
        name: "affiliationEndDate",
        label: "Affiliation End Date",
        type: "date",
        placeholder: "Select Date",
        required: true,
      },
    ],
  },
];
export const addressDetailsConfig: FormSection[] = [
  {
    title: "Address Details:",
    fields: [
      {
        name: "district",
        label: "District",
        type: "select",
        placeholder: "Select District",
        required: true,
        options: districtOptions,
      },
      {
        name: "tehsil",
        label: "Tehsil",
        type: "text",
        placeholder: " Tehsil",
        required: true,
      },
      {
        name: "village",
        label: "Village/ City",
        type: "text",
        placeholder: "Village",
        required: true,
        validation: z
          .string()
          .min(2, "Village/City must be at least 2 characters")
          .max(100, "Village/City must not exceed 100 characters"),
      },
      {
        name: "pincode",
        label: "Pincode",
        type: "text",
        placeholder: "Pin code",
        required: true,
        inputMode: "numeric",
        validation: z
          .string()
          .regex(/^\d{6}$/, "Pincode must be exactly 6 digits")
          .length(6, "Pincode must be exactly 6 digits"),
        restrictInput: "numeric",
      },
      {
        name: "address1",
        label: "Address 1",
        type: "text",
        placeholder: "Address 1",
        required: true,
        gridColumn: "1 / -1",
        validation: z
          .string()
          .min(5, "Address must be at least 5 characters")
          .max(200, "Address must not exceed 200 characters"),
      },
      {
        name: "address2",
        label: "Address 2",
        type: "text",
        placeholder: "Address 2",
        required: false,
        gridColumn: "1 / -1",
        validation: z
          .string()
          .max(200, "Address must not exceed 200 characters")
          .optional()
          .or(z.literal("")),
      },
      {
        name: "nearestAirport",
        label: "Nearest Airport",
        type: "text",
        placeholder: "Enter Name",
        required: true,
        validation: z
          .string()
          .min(2, "Airport name must be at least 2 characters")
          .max(100, "Airport name must not exceed 100 characters"),
      },
      {
        name: "nearestRailwayStation",
        label: "Nearest Railway Station",
        type: "text",
        placeholder: "+91-0000000000",
        required: true,
        validation: z
          .string()
          .min(2, "Railway station name must be at least 2 characters")
          .max(100, "Railway station name must not exceed 100 characters"),
      },
      {
        name: "nearestBusStand",
        label: "Nearest Bus Stand",
        type: "text",
        placeholder: "Enter Name",
        required: true,
        gridColumn: "1 / -1",
        validation: z
          .string()
          .min(2, "Bus stand name must be at least 2 characters")
          .max(100, "Bus stand name must not exceed 100 characters"),
      },
      {
        name: "latitude",
        label: "Latitude",
        type: "text",
        placeholder: "Latitude",
        required: true,
        inputMode: "decimal",
        validation: z
          .string()
          .regex(
            /^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})?$/,
            "Please enter a valid latitude (-90 to 90)"
          ),
      },
      {
        name: "longitude",
        label: "Longitude",
        type: "text",
        placeholder: "Longitude",
        required: true,
        inputMode: "decimal",
        validation: z
          .string()
          .regex(
            /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$/,
            "Please enter a valid longitude (-180 to 180)"
          ),
      },
    ],
  },
];

// College-specific configurations
export const collegeContactDetailsConfig: FormSection[] = [
  {
    title: "College Contact Details:",
    fields: [
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "Email Address",
        required: true,
        gridColumn: "1 / -1",
        validation: z.string().email("Please enter a valid email address"),
      },
      {
        name: "mobileNumber",
        label: "Mobile Number",
        type: "text",
        placeholder: "+91-0000000000",
        required: true,
        inputMode: "tel",
        validation: z
          .string()
          .regex(/^[+]?[0-9\s-()]+$/, "Please enter a valid mobile number")
          .min(10, "Mobile number must be at least 10 digits")
          .max(20, "Mobile number must not exceed 20 characters"),
      },
      {
        name: "faxNumber",
        label: "Fax Number",
        type: "text",
        placeholder: "+91-0000000000, 00000",
        required: true,
        inputMode: "tel",
        validation: z
          .string()
          .regex(/^[+]?[0-9\s,\-()]+$/, "Please enter a valid fax number")
          .max(30, "Fax number must not exceed 30 characters"),
      },
      {
        name: "webUrl",
        label: "Web URL",
        type: "text",
        placeholder: "Web URL",
        required: true,
        gridColumn: "1 / -1",
        validation: z
          .string()
          .url("Please enter a valid URL")
          .or(z.string().regex(/^https?:\/\/.+/, "URL must start with http:// or https://")),
      },
    ],
  },
  {
    title: "Contact Person Details:",
    fields: [
      {
        name: "designation",
        label: "Person Designation",
        type: "select",
        placeholder: "Select Designation",
        required: true,
        options: [
          { value: "principal", label: "Principal" },
          { value: "manager", label: "Manager" },
          { value: "admin", label: "Administrator" },
          { value: "coordinator", label: "Coordinator" },
          { value: "other", label: "Other" },
        ],
        gridColumn: "1 / 3",
      },
      {
        name: "contactPersonName",
        label: "Full Name",
        type: "text",
        placeholder: "Name",
        required: true,
        gridColumn: "1 / -1",
        validation: z
          .string()
          .min(2, "Name must be at least 2 characters")
          .max(200, "Name must not exceed 200 characters"),
      },
      {
        name: "contactPersonEmail",
        label: "Email Address",
        type: "email",
        placeholder: "Email",
        required: true,
        gridColumn: "1 / 3",
        validation: z.string().email("Please enter a valid email address"),
      },
      {
        name: "contactPersonMobile",
        label: "Mobile Number",
        type: "text",
        placeholder: "+91-0000000000",
        required: true,
        inputMode: "tel",
        gridColumn: "3 / 5",
        validation: z
          .string()
          .regex(/^[+]?[0-9\s\-()]+$/, "Please enter a valid mobile number")
          .min(10, "Mobile number must be at least 10 digits")
          .max(20, "Mobile number must not exceed 20 characters"),
      },
    ],
  },
];

export const collegeHostelDetailsConfig: FormSection[] = [
  {
    title: "Hostel Details:",
    fields: [
      {
        name: "hasHostel",
        label: "Does the college have hostel facilities?",
        type: "radio",
        required: true,
        gridColumn: "1 / -1",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ],
      },
      {
        name: "boysHostelCapacity",
        label: "Boys Hostel Capacity",
        type: "text",
        placeholder: "Enter Capacity",
        required: false,
        inputMode: "numeric",
        visibleWhen: { field: "hasHostel", is: "yes" },
        validation: z
          .string()
          .regex(/^\d+$/, "Please enter a valid number")
          .optional()
          .or(z.literal("")),
        restrictInput: "numeric",
      },
      {
        name: "girlsHostelCapacity",
        label: "Girls Hostel Capacity",
        type: "text",
        placeholder: "Enter Capacity",
        required: false,
        inputMode: "numeric",
        visibleWhen: { field: "hasHostel", is: "yes" },
        validation: z
          .string()
          .regex(/^\d+$/, "Please enter a valid number")
          .optional()
          .or(z.literal("")),
        restrictInput: "numeric",
      },
      {
        name: "hostelFees",
        label: "Hostel Fees (Annual)",
        type: "text",
        placeholder: "Enter Amount",
        required: false,
        inputMode: "numeric",
        visibleWhen: { field: "hasHostel", is: "yes" },
        validation: z
          .string()
          .regex(/^\d+$/, "Please enter a valid amount")
          .optional()
          .or(z.literal("")),
        restrictInput: "numeric",
      },
      {
        name: "hostelFacilities",
        label: "Hostel Facilities",
        type: "text",
        placeholder: "Describe facilities (e.g., Mess, Wi-Fi, Library)",
        required: false,
        gridColumn: "1 / -1",
        visibleWhen: { field: "hasHostel", is: "yes" },
        validation: z
          .string()
          .max(500, "Description must not exceed 500 characters")
          .optional()
          .or(z.literal("")),
      },
    ],
  },
];

export const collegeProgramDetailsConfig: FormSection[] = [
  {
    title: "Program Details:",
    fields: [
      {
        name: "selectedCourses",
        label: "Select Your Courses",
        type: "courseMultiSelect",
        required: true,
        gridColumn: "1 / -1",
        categories: [
          {
            type: "diploma",
            label: "Diploma Courses",
            courses: [
              { id: "d1", name: "Diploma in Agriculture", pattern: "Annual", duration: "2 Years" },
              { id: "d2", name: "Diploma in Engineering", pattern: "Semester", duration: "3 Years" },
              { id: "d3", name: "Diploma in Commerce", pattern: "Annual", duration: "2 Years" },
            ],
          },
          {
            type: "undergraduate",
            label: "Under Graduate Courses",
            courses: [
              { id: "u1", name: "B.A. in Agriculture", pattern: "Annual", duration: "3 Years" },
              { id: "u2", name: "B.Sc. in Physics", pattern: "Semester", duration: "3 Years" },
              { id: "u3", name: "B.Com. in Accounts", pattern: "Annual", duration: "3 Years" },
            ],
          },
          {
            type: "postgraduate",
            label: "Post Graduate Courses",
            courses: [
              { id: "p1", name: "M.Sc. in Agriculture", pattern: "Semester", duration: "2 Years" },
              { id: "p2", name: "M.A. in Economics", pattern: "Annual", duration: "2 Years" },
              { id: "p3", name: "M.Tech. in Civil Engineering", pattern: "Semester", duration: "2 Years" },
            ],
          },
        ],
        validation: z
          .record(z.array(z.string()))
          .refine(
            (data) => Object.values(data).some((courses) => courses.length > 0),
            { message: "Please select at least one course" }
          ),
      },
    ],
  },
];

export const diplomaCoursesList = [
  { id: "d1", courseName: "Diploma in Agriculture", pattern: "Annual", duration: "2 Years" },
  { id: "d2", courseName: "Diploma in Agriculture", pattern: "Semester", duration: "2 Years" },
  { id: "d3", courseName: "Diploma in Agriculture", pattern: "Annual", duration: "2 Years" },
  { id: "d4", courseName: "Diploma in Agriculture", pattern: "Semester", duration: "2 Years" },
];

export const ugCoursesList = [
  { id: "u1", courseName: "B.A. in Agriculture", pattern: "Annual", duration: "3 Years" },
];

export const pgCoursesList = [
  { id: "p1", courseName: "M.Sc. in Agriculture", pattern: "Semester", duration: "2 Years" },
];


export const declarationConfig = {
  title: "Student Declaration:",

  instructionText:
    "Please read the declaration carefully and confirm your acceptance before submitting the form.",

  declarations: [
    "I hereby declare that all the information provided by me in this form is true, complete, and correct to the best of my knowledge.",
    "I confirm that all documents uploaded/submitted by me are genuine and have not been altered or misrepresented in any way.",
    "I understand that if any information provided is found to be false or misleading, my admission/application may be cancelled without prior notice.",
    "I agree to abide by all the rules, regulations, and policies of the institution, including academic, administrative, and disciplinary guidelines.",
    "I understand the fee structure and agree to pay all applicable fees within the specified timelines.",
    "I undertake that I will maintain proper conduct, follow anti-ragging rules, and uphold the dignity of the institution.",
    "I consent to the use of my personal, academic, and contact information by the institution for academic, administrative, and regulatory purposes.",
  ],

  signatureLabel: "Original",
  signatureRequired: true,

  acceptance: {
    required: true,
    showCheckbox: true,
  },

  submitButtonText: "Submit",
  previousButtonText: "Previous",
};

export type DeclarationConfig = typeof declarationConfig;






export const collegeDeclarationConfig = {
  title: "College Declaration:",

  instructionText:
    "Please read the declaration carefully and confirm your acceptance before submitting the college profile.",

  declarations: [
    "I hereby declare that all the information provided in this college profile form is true, complete, and correct to the best of my knowledge.",
    "I confirm that all documents uploaded/submitted are genuine and have not been altered or misrepresented in any way.",
    "I understand that if any information provided is found to be false or misleading, the college's registration/affiliation may be affected.",
    "I agree to abide by all the rules, regulations, and policies of the university and regulatory bodies.",
    "I undertake to maintain proper standards, follow all educational norms, and uphold the dignity of the institution.",
    "I consent to the use of the college's information by the university for academic, administrative, and regulatory purposes.",
  ],

  signatureLabel: "Authorized Signature",
  signatureRequired: true,

  acceptance: {
    required: true,
    showCheckbox: true,
  },

  submitButtonText: "Submit College Profile",
  previousButtonText: "Previous",
};

export type CollegeDeclarationConfig = typeof collegeDeclarationConfig;
