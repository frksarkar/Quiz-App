const question = [
	{
		number: 1,
		question: 'ফ্রান্সের রাজধানী কোনটি?',
		options: ['রোম', 'প্যারিস', 'বার্লিন', 'মাদ্রিদ'],
		answer: 'প্যারিস',
	},
	{
		number: 2,
		question: 'পৃথিবীর সবচেয়ে বড় দেশ হল কোনটি?',
		options: ['কানাডা', 'চীন', 'রাশিয়া', 'মার্কিন যুক্তরাষ্ট্র'],
		answer: 'রাশিয়া',
	},
	{
		number: 3,
		question: 'পৃথিবীর সবচেয়ে ছোট মহাসাগর কোনটি?',
		options: [
			'আর্কটিক মহাসাগর',
			'ভারতীয় মহাসাগর',
			'প্রশান্ত মহাসাগর',
			'দক্ষিণ মহাসাগর',
		],
		answer: 'আর্কটিক মহাসাগর',
	},
	{
		number: 4,
		question: 'সূর্য একটি গ্রহ যা সবচেয়ে কাছে অবস্থিত?',
		options: ['ভেনাস', 'মার্কিউরি', 'মঙ্গল', 'বৃহস্পতি'],
		answer: 'মার্কিউরি',
	},
	{
		number: 5,
		question: 'অস্ট্রেলিয়ার রাজধানী কোনটি?',
		options: ['মেলবার্ন', 'সিডনি', 'ক্যানবেরা', 'ব্রিসবেন'],
		answer: 'ক্যানবেরা',
	},
	{
		number: 6,
		question: 'পৃথিবীর সবচেয়ে বড় প্রাণী কোনটি?',
		options: ['হাতি', 'জিরাফ', 'ব্লু ওয়েল', 'হিপোপোটামাস'],
		answer: 'ব্লু ওয়েল',
	},
	{
		number: 7,
		question: 'জাপানের মুদ্রা কি?',
		options: ['ইউরো', 'ডলার', 'পাউন্ড', 'ইয়েন'],
		answer: 'ইয়েন',
	},
	{
		number: 8,
		question: "'টু কিল এ মকিংবার্ড' নামক উপন্যাসটি কে লেখেছেন?",
		options: ['হার্পার লি', 'জে.কে. রোলিং', 'স্টিফেন কিং', 'জর্জ অরওয়েল'],
		answer: 'হার্পার লি',
	},
	{
		number: 9,
		question: 'পৃথিবীর সবচেয়ে লম্বা প্রাণী কোনটি?',
		options: ['জিরাফ', 'হাতি', 'হিপোপাটামাস', 'রাইনো'],
		answer: 'জিরাফ',
	},
	{
		number: 10,
		question: "কোন প্রখ্যাপক ছবিটি 'মোনা লিসা' চিত্রিত করেছেন?",
		options: [
			'ভিনসেন্ট ভ্যান গোগ',
			'পাবলো পিকাসো',
			'লিওনার্দো দা ভিঞ্চি',
			'ক্লোড মনে',
		],
		answer: 'লিওনার্দো দা ভিঞ্চি',
	},
	{
		number: 11,
		question: 'স্বর্ণের রাসায়নিক প্রতীক কী?',
		options: ['Ag', 'Au', 'Cu', 'Fe'],
		answer: 'Au',
	},
	{
		number: 12,
		question: 'মার্কিন যুক্তরাষ্ট্রের বর্তমান রাষ্ট্রপতি কে?',
		options: [
			'জো বাইডেন',
			'ডোনাল্ড ট্রাম্প',
			'বারাক ওবামা',
			'জর্জ ডাবলিউ. বুশ',
		],
		answer: 'জো বাইডেন',
	},
	{
		number: 13,
		question: 'পৃথিবীর সবচেয়ে বড় মরুভূমি কোনটি?',
		options: [
			'সাহারা মরুভূমি',
			'আরবিয়ান মরুভূমি',
			'গোবি মরুভূমি',
			'অ্যান্টার্কটিক মরুভূমি',
		],
		answer: 'অ্যান্টার্কটিক মরুভূমি',
	},
	{
		number: 14,
		question: 'সাবধানতার সাথে কোন পরিবহন চলানো উচিত না?',
		options: ['জাহাজ', 'হেলিকপ্টার', 'বাস', 'বাইক'],
		answer: 'বাইক',
	},
	{
		number: 15,
		question: 'দৈনিক কণ্ঠের সম্পাদক কে?',
		options: [
			'আবদুল কদের সরকার',
			'নজরুল ইসলাম',
			'ইয়ার আবদুল্লাহ',
			'ইফতেখার চৌধুরী',
		],
		answer: 'আবদুল কদের সরকার',
	},
	{
		number: 16,
		question: 'বাংলাদেশের জাতীয় সঙ্গীত কী?',
		options: [
			'স্বাধীনতা তুমি',
			'আমার সোনার বাংলা',
			'পুরনো বাগানের সুর',
			'শেষ করে আমি',
		],
		answer: 'আমার সোনার বাংলা',
	},
	{
		number: 17,
		question: 'ইউরোপের সবচেয়ে দীর্ঘ নদী কোনটি?',
		options: ['ভোল্গা', 'ডনাউ', 'এলবা', 'সিন'],
		answer: 'ভোল্গা',
	},
	{
		number: 18,
		question: 'ছাত্রলীগ কখন গঠিত হয়?',
		options: ['১৯৪৮', '১৯৪৯', '১৯৫৪', '১৯৬২'],
		answer: '১৯৪৯',
	},
	{
		number: 19,
		question:
			'কোন সাধুর জন্ম ও বিদায় তারিখ বিশ্ব ধর্ম দিবস হিসাবে পালন করা হয়?',
		options: [
			'বুদ্ধ ৮ অক্টোবর',
			'শঙ্কর ১২ জানুয়ারি',
			'ক্রিশ্চিয়ন ২৫ ডিসেম্বর',
			'ইসলাম ১৫ জুলাই',
		],
		answer: 'বুদ্ধ ৮ অক্টোবর',
	},
	{
		number: 20,
		question: "সিনেমা জগতে 'ওস্কার' পুরষ্কার কোন দেশ প্রদান করে?",
		options: ['আমেরিকা', 'ফরান্স', 'ইংল্যান্ড', 'ফ্রান্স'],
		answer: 'আমেরিকা',
	},
];