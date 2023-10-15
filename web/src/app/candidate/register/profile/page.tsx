'use client'

import { ErrorMessage } from '@/components/ErrorMessage'
import { FieldDescription } from '@/components/FieldDescription'
import { countries } from '@/lib/countries'
import { roles } from '@/lib/roles'
import { AcademicExperience } from '@/schemas/AcademicData'
import {
  CandidateProfile,
  CandidateProfileSch,
} from '@/schemas/CandidateProfile'
import { Experience } from '@/schemas/ExperienceData'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

export default function CandidateCompleteProfilePage() {
  const [educationSections, setEducationSections] = useState<
    AcademicExperience[]
  >([
    {
      endDate: new Date(),
      grade: 0,
      obtainedDegree: '',
      schoolName: '',
      startDate: new Date(),
    },
  ])
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      endDate: new Date(),
      title: '',
      company: '',
      employment: 'Full-Time',
      role: 'Fullstack Developer',
      startDate: new Date(),
    },
  ])

  const {
    formState: { errors, isValid, isSubmitSuccessful },
    register,
  } = useForm<CandidateProfile>({
    mode: 'onChange',
    resolver: zodResolver(CandidateProfileSch),
  })

  const addEducationSection = () => {
    setEducationSections([
      ...educationSections,
      {
        endDate: new Date(),
        grade: 0,
        obtainedDegree: '',
        schoolName: '',
        startDate: new Date(),
      },
    ])
  }

  const removeEducationSection = (index: number) => {
    const updatedSections = [...educationSections]
    updatedSections.splice(index, 1)
    setEducationSections(updatedSections)
  }

  const addExperienceSection = () => {
    setExperiences([
      ...experiences,
      {
        endDate: new Date(),
        title: '',
        company: '',
        employment: 'Full-Time',
        role: 'Fullstack Developer',
        startDate: new Date(),
      },
    ])
  }

  const removeExperienceSection = (index: number) => {
    const updatedSections = [...experiences]
    updatedSections.splice(index, 1)
    setExperiences(updatedSections)
  }

  return (
    <div className='mx-auto max-w-2xl p-8'>
      <form className='space-y-6' onSubmit={() => console.log('Submitting...')}>
        <header>
          <h2 className='mb-3 text-2xl font-bold leading-7 tracking-tight text-gray-900'>
            Complete your information
          </h2>
          <p className='text-sm text-gray-600'>
            To apply for some projects, please make sure that your information
            is complete
          </p>
        </header>
        <hr className='border-b-1' />
        <section>
          <h3 className='mb-2 mt-10 text-xl font-semibold'>
            Basic Information
          </h3>
          <article className='mb-6'>
            <FieldDescription
              title='Your best role'
              description="Select the position you're comfortable with"
            />
            <div className='space-y-3'>
              {roles.map((role) => (
                <div key={role.id} className='flex items-center gap-x-3'>
                  <input
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                    id={role.id}
                    type='radio'
                    value={role.value}
                    {...register('role')}
                  />
                  <label
                    htmlFor={role.id}
                    className='block text-sm font-light leading-6 text-gray-900'
                  >
                    {role.label}
                  </label>
                </div>
              ))}

              {errors.role && <ErrorMessage message={errors.role.message} />}
            </div>
          </article>

          <article className='mb-6'>
            <FieldDescription
              title='What languages do you speak?'
              description='Use comma-separated values to list your languages'
            />

            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                data-testid='ccpp-spoken-languages'
                type='text'
                id='spokenLanguages'
                autoComplete='spokenLanguages'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder='English,Spanish,Russian'
                {...register('spokenLanguages')}
              />
            </div>

            {errors.spokenLanguages && (
              <ErrorMessage message={errors.spokenLanguages.message} />
            )}
          </article>

          <article className='mb-6'>
            <FieldDescription
              title='What are your main soft-skills?'
              description='Use comma-separated values to list your soft-skills'
            />
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                type='text'
                id='mainSoftSkills'
                autoComplete='mainSoftSkills'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder='Patience,Honesty'
                {...register('mainSoftSkills')}
              />
            </div>

            {errors.mainSoftSkills && (
              <ErrorMessage message={errors.mainSoftSkills.message} />
            )}
          </article>

          <article className='mb-6'>
            <FieldDescription
              title='Location'
              description='Select your main location even if you move constantly between countries'
            />

            <select
              id='location'
              defaultValue='Colombia'
              autoComplete='location'
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6'
              {...register('location')}
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            {errors.location && (
              <ErrorMessage message={errors.location.message} />
            )}
          </article>
        </section>
        <section>
          <h3 className='mb-2 mt-10 text-xl font-semibold'>Technical Data</h3>

          <article className='mb-3'>
            <FieldDescription
              title='Your tech-skills'
              description='Use comma-separated values to list your tech-skills'
            />

            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                type='text'
                id='techSkills'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder='Git,TailwindCSS'
                {...register('technicalData.techSkills')}
              />
            </div>

            {errors.technicalData?.techSkills && (
              <ErrorMessage message={errors.technicalData.techSkills.message} />
            )}
          </article>

          <article className='mb-3'>
            <FieldDescription
              title='Programming Languages'
              description='Use comma-separated values to list your tech-skills'
            />

            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                type='text'
                id='programmingLanguages'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder='JavaScript,Python,CSS,HTML,Java,Go'
                {...register('technicalData.programmingLanguages')}
              />
            </div>

            {errors.technicalData?.programmingLanguages && (
              <ErrorMessage
                message={errors.technicalData.programmingLanguages.message}
              />
            )}
          </article>

          <article className='mb-3'>
            <FieldDescription
              title='Roles'
              description='Use comma-separated values to list your tech-skills'
            />

            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                type='text'
                id='roles'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder='JavaScript,Python,CSS,HTML,Java,Go'
                {...register('technicalData.roles')}
              />
            </div>

            {errors.technicalData?.roles && (
              <ErrorMessage message={errors.technicalData.roles.message} />
            )}
          </article>

          <article className='mb-3'>
            <FieldDescription title='Years of experience' />

            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                min={0}
                max={50}
                type='number'
                id='certifications'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                {...register('technicalData.yearsOfExperience', {
                  valueAsNumber: true,
                })}
              />
            </div>

            {errors.technicalData?.yearsOfExperience && (
              <ErrorMessage
                message={errors.technicalData.yearsOfExperience.message}
              />
            )}
          </article>
        </section>
        <section>
          <h3 className='mb-2 mt-10 text-xl font-semibold'>Academic Data</h3>

          <article className='mb-6'>
            <FieldDescription
              title='Your certifications'
              description='Use comma-separated values to list your tech certifications'
            />

            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                type='text'
                id='certifications'
                autoComplete='certifications'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder='AWS,GCP,Azure'
                {...register('certifications')}
              />
            </div>

            {errors.certifications && (
              <ErrorMessage message={errors.certifications.message} />
            )}
          </article>

          <article>
            <FieldDescription title='Add Studies' />
            {educationSections.map((section, index) => (
              <div key={uuidv4()}>
                <div className='mb-3'>
                  <FieldDescription title='School Name' />

                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      type='text'
                      id='schoolName'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='Los Andes University'
                      {...register(`academicData.${index}.schoolName`)}
                    />
                  </div>

                  {errors.academicData?.[index]?.schoolName && (
                    <ErrorMessage
                      message={errors.academicData[index]?.schoolName?.message}
                    />
                  )}
                </div>

                <div className='mb-3'>
                  <FieldDescription title='Obtained Degree' />

                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      type='text'
                      id='obtainedDegree'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='MSc. Software Engineer'
                      {...register(`academicData.${index}.obtainedDegree`)}
                    />
                  </div>

                  {errors.academicData?.[index]?.obtainedDegree && (
                    <ErrorMessage
                      message={
                        errors.academicData[index]?.obtainedDegree?.message
                      }
                    />
                  )}
                </div>

                <div className='mb-3 flex gap-3'>
                  <div className='flex flex-col'>
                    <FieldDescription title='Start date' />

                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                      <input
                        type='date'
                        id='startDate'
                        max={new Date().toDateString()}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        {...register(`academicData.${index}.startDate`)}
                      />
                    </div>

                    {errors.academicData?.[index]?.startDate && (
                      <ErrorMessage
                        message={errors.academicData[index]?.startDate?.message}
                      />
                    )}
                  </div>

                  <div className='flex flex-col'>
                    <FieldDescription title='End date' />

                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                      <input
                        type='date'
                        id='endDate'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        {...register(`academicData.${index}.endDate`)}
                      />
                    </div>

                    {errors.academicData?.[index]?.endDate && (
                      <ErrorMessage
                        message={errors.academicData[index]?.endDate?.message}
                      />
                    )}
                  </div>
                </div>

                <div className='sm:col-span-4'>
                  <FieldDescription title='Grade' />

                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      min={0}
                      max={5}
                      type='number'
                      id='certifications'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      {...register(`academicData.${index}.grade`, {
                        valueAsNumber: true,
                      })}
                    />
                  </div>

                  {errors.academicData?.[index]?.grade && (
                    <ErrorMessage
                      message={errors.academicData[index]?.grade?.message}
                    />
                  )}
                </div>

                <button
                  type='button'
                  className='mb-10 mr-3 mt-3 rounded bg-red-700 px-4 py-2 text-sm font-semibold text-white'
                  onClick={() => removeEducationSection(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type='button'
              className='rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold leading-6'
              onClick={addEducationSection}
            >
              Add more education
            </button>
          </article>
        </section>
        <section>
          <h3 className='mb-2 mt-10 text-xl font-semibold'>Experience</h3>

          <article>
            {experiences.map((section, index) => (
              <div key={uuidv4()}>
                <div className='mb-3'>
                  <FieldDescription title='Title' />

                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      type='text'
                      id='title'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='CEO'
                      {...register(`experienceData.${index}.title`)}
                    />
                  </div>

                  {errors.experienceData?.[index]?.title && (
                    <ErrorMessage
                      message={errors.experienceData[index]?.title?.message}
                    />
                  )}
                </div>

                <div className='mb-3'>
                  <FieldDescription title='Company' />

                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      type='text'
                      id='company'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder='ABC Jobs'
                      {...register(`experienceData.${index}.company`)}
                    />
                  </div>

                  {errors.experienceData?.[index]?.company && (
                    <ErrorMessage
                      message={errors.experienceData[index]?.company?.message}
                    />
                  )}
                </div>

                <div className='mb-3'>
                  <FieldDescription title='Employment Type' />

                  <select
                    id='expEmployment'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6'
                    {...register(`experienceData.${index}.employment`)}
                  >
                    <option value='Full-Time'>Full-Time</option>
                    <option value='Part-Time'>Part-Time</option>
                    <option value='Contract'>Contract</option>
                    <option value='Freelance'>Freelance</option>
                    <option value='Internship'>Internship</option>
                  </select>

                  {errors.experienceData?.[index]?.employment && (
                    <ErrorMessage
                      message={
                        errors.experienceData[index]?.employment?.message
                      }
                    />
                  )}
                </div>

                <div className='mb-3 flex gap-3'>
                  <div className='flex flex-col'>
                    <FieldDescription title='Start date' />

                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                      <input
                        type='date'
                        id='expStartDate'
                        max={new Date().toDateString()}
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        {...register(`experienceData.${index}.startDate`)}
                      />
                    </div>

                    {errors.experienceData?.[index]?.startDate && (
                      <ErrorMessage
                        message={
                          errors.experienceData[index]?.startDate?.message
                        }
                      />
                    )}
                  </div>

                  <div className='flex flex-col'>
                    <FieldDescription title='End date' />

                    <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                      <input
                        type='date'
                        id='expEndDate'
                        className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                        {...register(`experienceData.${index}.endDate`)}
                      />
                    </div>

                    {errors.experienceData?.[index]?.endDate && (
                      <ErrorMessage
                        message={errors.experienceData[index]?.endDate?.message}
                      />
                    )}
                  </div>
                </div>

                <div className='mb-3'>
                  <FieldDescription title='Employment Type' />

                  <select
                    id='expRole'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6'
                    {...register(`experienceData.${index}.role`)}
                  >
                    <option value='Backend Developer'>Backend Developer</option>
                    <option value='Frontend Developer'>
                      Frontend Developer
                    </option>
                    <option value='Fullstack Developer'>
                      Fullstack Developer
                    </option>
                    <option value='DevOps Engineer'>DevOps Engineer</option>
                    <option value='Architect'>Architect</option>
                  </select>

                  {errors.experienceData?.[index]?.role && (
                    <ErrorMessage
                      message={errors.experienceData[index]?.role?.message}
                    />
                  )}
                </div>

                <button
                  type='button'
                  className='mb-10 mr-3 mt-3 rounded bg-red-700 px-4 py-2 text-sm font-semibold text-white'
                  onClick={() => removeExperienceSection(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type='button'
              className='rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold leading-6'
              onClick={addExperienceSection}
            >
              Add more experience
            </button>
          </article>
        </section>

        <div className='flex space-x-2'>
          <button
            type='reset'
            className='flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200'
          >
            Cancel
          </button>

          <button
            data-testid='ccpp-submit-button'
            disabled={!isValid || isSubmitSuccessful}
            type='submit'
            className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
