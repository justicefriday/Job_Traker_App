import * as yup from 'yup';

// Auth validation
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .max(100, 'Email cannot exceed 100 characters'),
  
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password cannot exceed 50 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

// Job validation
export const jobSchema = yup.object().shape({
    company: yup
        .string()
    .required('Company name is required')
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name cannot exceed 100 characters')
    .trim(),
  
  position: yup
    .string()
    .required('Position is required')
    .min(2, 'Position must be at least 2 characters')
    .max(100, 'Position cannot exceed 100 characters')
    .trim(),
  
  location: yup
    .string()
    .required('Location is required')
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location cannot exceed 100 characters')
    .trim(),
  
  status: yup
    .string()
    .required('Status is required')
    .oneOf(['applied', 'interview', 'offer', 'rejected'], 'Invalid status'),
  
  jobType: yup
    .string()
    .required('Job type is required')
    .oneOf(['full-time', 'part-time', 'remote', 'contract'], 'Invalid job type'),
  
  salary: yup
    .string()
    .max(50, 'Salary cannot exceed 50 characters')
    .trim(),
  
  notes: yup
    .string()
    .max(500, 'Notes cannot exceed 500 characters')
    .trim(),
});