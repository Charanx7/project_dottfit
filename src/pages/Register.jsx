

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { 
  User, Heart, Activity, Target, Clock, Dumbbell,
  ChevronRight, ChevronLeft, CheckCircle, AlertCircle,
  Bed, Wine, Flame, Award, Phone, Mail
} from 'lucide-react';

const InputField = ({ label, type = "text", value, onChange, placeholder, icon: Icon, required = true, name }) => (
  <div className="space-y-2">
    <label className="flex items-center text-sm font-medium text-gray-300">
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {label} {required && '*'}
    </label>
    <div className="relative group">
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 sm:px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl 
                  focus:ring-2 focus:ring-blue-400 focus:border-transparent
                  transition-all duration-300 group-hover:border-gray-500
                  backdrop-blur-sm text-white placeholder-gray-400 text-sm sm:text-base"
        required={required}
      />
    </div>
  </div>
);

const TextAreaField = ({ label, value, onChange, placeholder, rows = 4, required = true, name }) => (
  <div className="space-y-2">
    <label className="flex items-center text-sm font-medium text-gray-300">
      {label} {required && '*'}
    </label>
    <textarea
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 sm:px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl 
                focus:ring-2 focus:ring-blue-400 focus:border-transparent
                transition-all duration-300 hover:border-gray-500
                backdrop-blur-sm text-white placeholder-gray-400 resize-none text-sm sm:text-base"
      required={required}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, placeholder, icon: Icon, required = true, name }) => (
  <div className="space-y-2">
    <label className="flex items-center text-sm font-medium text-gray-300">
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {label} {required && '*'}
    </label>
    <select
      value={value}
      name={name}
      onChange={onChange}
      className="w-full px-3 sm:px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl 
                focus:ring-2 focus:ring-blue-400 focus:border-transparent
                transition-all duration-300 hover:border-gray-500
                backdrop-blur-sm text-white placeholder-gray-400 text-sm sm:text-base"
      required={required}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const GoalCheckbox = ({ goal, selected, onChange }) => (
  <label className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-700/50 cursor-pointer transition-all duration-200">
    <input
      type="checkbox"
      checked={selected}
      onChange={() => onChange(goal)}
      className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-400"
    />
    <span className="text-gray-300 text-sm sm:text-base">{goal}</span>
  </label>
);

const ProgressDot = ({ index, completed, current, title }) => (
  <div className="flex flex-col items-center">
    <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-500 ${
      completed ? 'bg-gradient-to-r from-green-400 to-emerald-500 scale-110' :
      current ? 'bg-gradient-to-r from-blue-400 to-cyan-400 scale-110' :
      'bg-gray-600 border border-gray-500'
    }`}>
      {completed ? (
        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      ) : (
        <span className={`font-semibold text-sm sm:text-base ${current ? 'text-white' : 'text-gray-300'}`}>
          {index + 1}
        </span>
      )}
    </div>
    <span className="text-xs mt-1 sm:mt-2 text-gray-400 text-center max-w-16 sm:max-w-20 hidden xs:block">
      {title.split(' ')[0]}
    </span>
  </div>
);

const ProgressConnector = ({ completed }) => (
  <div className={`w-8 sm:w-12 md:w-16 h-1 mx-1 sm:mx-2 mt-4 sm:mt-5 transition-all duration-500 ${
    completed ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gray-600'
  }`} />
);

const activityLevels = [
  "Sedentary (desk job, minimal physical activity)",
  "Lightly active (light exercise 1-3 days/week)",
  "Moderately active (regular walking/standing, some exercise)",
  "Very active (hard exercise 4-5 days/week)",
  "Extremely active (hard exercise daily)"
];

const fitnessGoals = [
  "Weight loss",
  "Muscle gain",
  "Improve stamina/endurance",
  "Increase strength",
  "Improve flexibility/mobility",
  "General health & wellness",
  "Sports-specific performance"
];

const timelines = [
  "1-3 months",
  "3-6 months",
  "6-12 months",
  "More than 1 year"
];

const sections = [
  { title: "Personal Information", subtitle: "Basic details about yourself", icon: User, color: "from-blue-500 to-cyan-500" },
  { title: "Medical History", subtitle: "Your health background", icon: Heart, color: "from-red-500 to-pink-500" },
  { title: "Lifestyle", subtitle: "Daily habits and routine", icon: Activity, color: "from-green-500 to-emerald-500" },
  { title: "Current Activity", subtitle: "Your exercise routine", icon: Clock, color: "from-purple-500 to-indigo-500" },
  { title: "Fitness Goals", subtitle: "What you want to achieve", icon: Target, color: "from-orange-500 to-amber-500" }
];

const FitnessAssessmentForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    occupation: '',
    email: '',
    contactNumber: '',
    medicalConditions: '',
    medications: '',
    injuries: '',
    jointPain: '',
    doctorAdvice: '',
    sleepHours: '',
    smoking: '',
    alcohol: '',
    alcoholFrequency: '',
    activityLevel: '',
    currentlyExercising: '',
    goals: [],
    timeline: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const isCurrentSectionComplete = () => {
    const currentSectionFields = {
      0: ['fullName', 'age', 'gender', 'height', 'weight', 'occupation', 'email', 'contactNumber'],
      1: ['medicalConditions', 'medications', 'injuries', 'jointPain', 'doctorAdvice'],
      2: ['sleepHours', 'smoking', 'alcohol', 'activityLevel'],
      3: ['currentlyExercising'],
      4: ['goals', 'timeline']
    };
    const fields = currentSectionFields[currentSection];
    return fields.every(field => {
      if (field === 'goals') return formData.goals.length > 0;
      if (field === 'alcoholFrequency' && formData.alcohol === 'No') return true;
      return formData[field] && formData[field].toString().trim() !== '';
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPayload = {
      fullName: formData.fullName,
      age: formData.age,
      gender: formData.gender,
      height: formData.height,
      weight: formData.weight,
      occupation: formData.occupation,
      contact: formData.email,
      contactNumber: formData.contactNumber,
      medicalConditions: formData.medicalConditions,
      medications: formData.medications,
      injuries: formData.injuries,
      jointPain: formData.jointPain,
      doctorAdvice: formData.doctorAdvice,
      sleepHours: formData.sleepHours,
      smoking: formData.smoking,
      alcohol: formData.alcohol,
      alcoholFrequency: formData.alcoholFrequency,
      activityLevel: formData.activityLevel,
      currentlyExercising: formData.currentlyExercising,
      goals: formData.goals.join(', '),
      timeline: formData.timeline
    };
    
    emailjs.send(
      "service_jj0yb24",
      "template_zjyj4ug",
      emailPayload,
      "TOg3FSHAZlLd7OE21"
    )
      .then(() => {
        alert('Fitness Assessment Submitted Successfully!');
        setFormData({
          fullName: '', age: '', gender: '', height: '', weight: '', occupation: '', email: '', contactNumber: '',
          medicalConditions: '', medications: '', injuries: '', jointPain: '', doctorAdvice: '',
          sleepHours: '', smoking: '', alcohol: '', alcoholFrequency: '', activityLevel: '',
          currentlyExercising: '', goals: [], timeline: ''
        });
        setCurrentSection(0);
      }, (error) => {
        alert('Error sending form, please try again.');
        console.error('EmailJS Error:', error.text);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-500/10" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 px-3 sm:px-4 py-1 sm:py-2 rounded-full mb-3 sm:mb-4">
              <Dumbbell className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-semibold">FITNESS ASSESSMENT</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent mb-3 sm:mb-4">
              Complete Your Fitness Profile
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-2">
              Help us create your personalized fitness plan by completing this detailed assessment
            </p>
          </div>
        </div>
      </div>

      {/* Progress Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="flex justify-center items-start mb-6 sm:mb-8 overflow-x-auto pb-2">
          <div className="flex items-center min-w-max">
            {sections.map((section, index) => (
              <div key={index} className="flex items-center">
                <ProgressDot
                  index={index}
                  completed={index < currentSection}
                  current={index === currentSection}
                  title={section.title}
                />
                {index < sections.length - 1 && (
                  <ProgressConnector completed={index < currentSection} />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mb-2">
          <span className="text-blue-400 font-semibold text-base sm:text-lg">{sections[currentSection].title}</span>
          <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs sm:text-sm mt-1">
            <span>Step {currentSection + 1} of {sections.length}</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <span>{sections[currentSection].subtitle}</span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-8 sm:pb-16">
        <form onSubmit={handleSubmit}>
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-gray-700/50 p-4 sm:p-6 md:p-8 shadow-2xl">
            {/* Section 1 */}
            {currentSection === 0 && (
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <InputField label="Full Name" value={formData.fullName} name="fullName" onChange={e => handleInputChange('fullName', e.target.value)} placeholder="Enter your full name" icon={User} />
                  <InputField label="Age" type="number" value={formData.age} name="age" onChange={e => handleInputChange('age', e.target.value)} placeholder="Your age" />
                  <SelectField label="Gender" value={formData.gender} name="gender" onChange={e => handleInputChange('gender', e.target.value)} options={['Male', 'Female', 'Other', 'Prefer not to say']} placeholder="Select gender" />
                  <InputField label="Height" value={formData.height} name="height" onChange={e => handleInputChange('height', e.target.value)} placeholder="e.g., 5'8 or 172cm" />
                  <InputField label="Weight" value={formData.weight} name="weight" onChange={e => handleInputChange('weight', e.target.value)} placeholder="e.g., 150 lbs or 68 kg" />
                  <InputField label="Occupation" value={formData.occupation} name="occupation" onChange={e => handleInputChange('occupation', e.target.value)} placeholder="Your profession" />
                  <InputField label="Email Address" type="email" value={formData.email} name="email" onChange={e => handleInputChange('email', e.target.value)} placeholder="Enter your email address" icon={Mail} />
                  <InputField label="Contact Number" type="tel" value={formData.contactNumber} name="contactNumber" onChange={e => handleInputChange('contactNumber', e.target.value)} placeholder="Enter your phone number" icon={Phone} />
                </div>
              </div>
            )}

            {/* Section 2 */}
            {currentSection === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <TextAreaField label="Do you have any existing medical conditions? (e.g., diabetes, hypertension, asthma)" value={formData.medicalConditions} name="medicalConditions" onChange={e => handleInputChange('medicalConditions', e.target.value)} placeholder="List any medical conditions or 'None'" rows={3} />
                <TextAreaField label="Are you currently taking any medications or supplements?" value={formData.medications} name="medications" onChange={e => handleInputChange('medications', e.target.value)} placeholder="List medications/supplements or 'None'" rows={3} />
                <TextAreaField label="Have you had any injuries or surgeries in the past year?" value={formData.injuries} name="injuries" onChange={e => handleInputChange('injuries', e.target.value)} placeholder="Describe any injuries or surgeries, or 'None'" rows={3} />
                <TextAreaField label="Do you have any joint pain or mobility issues?" value={formData.jointPain} name="jointPain" onChange={e => handleInputChange('jointPain', e.target.value)} placeholder="Describe any joint pain or mobility issues, or 'None'" rows={3} />
                <TextAreaField label="Has a doctor ever advised you not to exercise?" value={formData.doctorAdvice} name="doctorAdvice" onChange={e => handleInputChange('doctorAdvice', e.target.value)} placeholder="Any doctor's advice regarding exercise, or 'None'" rows={3} />
              </div>
            )}

            {/* Section 3 */}
            {currentSection === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <SelectField label="How many hours do you sleep per night?" value={formData.sleepHours} name="sleepHours" onChange={e => handleInputChange('sleepHours', e.target.value)} options={['Less than 5 hours', '5-6 hours', '7-8 hours', 'More than 8 hours']} placeholder="Select sleep duration" icon={Bed} />
                <SelectField label="Do you smoke?" value={formData.smoking} name="smoking" onChange={e => handleInputChange('smoking', e.target.value)} options={['No', 'Yes - occasionally', 'Yes - regularly', 'Former smoker']} placeholder="Select smoking status" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <SelectField label="Do you consume alcohol?" value={formData.alcohol} name="alcohol" onChange={e => handleInputChange('alcohol', e.target.value)} options={['No', 'Yes']} placeholder="Select option" icon={Wine} />
                  {formData.alcohol === 'Yes' && (<SelectField label="How often?" value={formData.alcoholFrequency} name="alcoholFrequency" onChange={e => handleInputChange('alcoholFrequency', e.target.value)} options={['Rarely', '1-2 times per week', '3-4 times per week', 'Daily']} placeholder="Select frequency" />)}
                </div>
                <SelectField label="Activity Level" value={formData.activityLevel} name="activityLevel" onChange={e => handleInputChange('activityLevel', e.target.value)} options={activityLevels} placeholder="Select your activity level" icon={Flame} />
              </div>
            )}

            {/* Section 4 */}
            {currentSection === 3 && (
              <div className="space-y-4 sm:space-y-6">
                <TextAreaField label="Are you currently exercising?" value={formData.currentlyExercising} name="currentlyExercising" onChange={e => handleInputChange('currentlyExercising', e.target.value)} placeholder="Describe your current exercise routine, frequency, and types of activities. If not exercising, please write 'No' or 'None'." rows={5} />
              </div>
            )}

            {/* Section 5 */}
            {currentSection === 4 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3 sm:mb-4">What are your primary goals? (Choose all that apply) *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                    {fitnessGoals.map((goal, index) => (
                      <GoalCheckbox key={index} goal={goal} selected={formData.goals.includes(goal)} onChange={handleGoalToggle} />
                    ))}
                  </div>
                </div>
                
                <SelectField label="Desired timeline to reach your goals" value={formData.timeline} name="timeline" onChange={e => handleInputChange('timeline', e.target.value)} options={timelines} placeholder="Select your timeline" icon={Award} />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700/50">
              <button 
                type="button" 
                onClick={() => setCurrentSection(prev => prev - 1)} 
                disabled={currentSection === 0} 
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 border border-gray-600 hover:border-gray-500 order-2 sm:order-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto order-1 sm:order-2">
                {!isCurrentSectionComplete() && (
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Please complete all required fields</span>
                  </div>
                )}
                
                <span className="text-sm text-gray-400 hidden sm:inline">{currentSection + 1} of {sections.length}</span>
                
                {currentSection === sections.length - 1 ? (
                  <button 
                    type="submit" 
                    disabled={!isCurrentSectionComplete()} 
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
                  >
                    <span>Complete Assessment</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => setCurrentSection(prev => prev + 1)} 
                    disabled={!isCurrentSectionComplete()} 
                    className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FitnessAssessmentForm;