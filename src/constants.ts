export const ROLES = [
  'Director / Producer',
  'Writer',
  'Cinematographer',
  'Actor',
  'Editor',
  'Music Producer'
] as const;

export type Role = typeof ROLES[number];

export const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Professional'] as const;
export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number];

export const DISTRICTS = [
  'Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Jamalpur', 'Kishoreganj', 'Madaripur', 'Manikganj', 'Munshiganj', 'Mymensingh', 'Narayanganj', 'Narsingdi', 'Netrokona', 'Rajbari', 'Shariatpur', 'Sherpur', 'Tangail',
  'Bogra', 'Joypurhat', 'Naogaon', 'Natore', 'Nawabganj', 'Pabna', 'Rajshahi', 'Sirajgonj',
  'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Rangpur', 'Thakurgaon',
  'Barguna', 'Barisal', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur',
  'Bandarban', 'Brahmanbaria', 'Chandpur', 'Chattogram', 'Cumilla', 'Cox\'s Bazar', 'Feni', 'Khagrachari', 'Lakshmipur', 'Noakhali', 'Rangamati',
  'Habiganj', 'Maulvibazar', 'Sunamganj', 'Sylhet',
  'Bagerhat', 'Chuadanga', 'Jashore', 'Jhenaidah', 'Khulna', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira'
] as const;
export type District = typeof DISTRICTS[number];
