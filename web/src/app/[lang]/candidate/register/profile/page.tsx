'use client'

import { ErrorMessage } from '@/components/ErrorMessage'
import { FieldDescription } from '@/components/FieldDescription'
import { CANDIDATE_HOST } from '@/lib/api'
import { countries } from '@/lib/countries'
import { roles } from '@/lib/roles'
import { AcademicExperience } from '@/schemas/AcademicData'
import {
  CandidateProfile,
  CandidateProfileSch,
} from '@/schemas/CandidateProfile'
import { Experience } from '@/schemas/ExperienceData'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  params: { lang: string }
}

export default function CandidateCompleteProfilePage({ params }: Props) {
  const t = useTranslations('CandidateProfilePage')
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

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
      role: 'fullstack',
      startDate: new Date(),
    },
  ])

  const {
    formState: { errors, isValid, isSubmitSuccessful },
    register,
    handleSubmit,
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
        role: 'fullstack',
        startDate: new Date(),
      },
    ])
  }

  const removeExperienceSection = (index: number) => {
    const updatedSections = [...experiences]
    updatedSections.splice(index, 1)
    setExperiences(updatedSections)
  }

  async function onSubmit(data: CandidateProfile) {
    try {
      const response = await fetch(
        `${CANDIDATE_HOST}/candidate/register/profile`,
        {
          body: JSON.stringify({ email, ...data }),
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
          },
          method: 'POST',
          referrerPolicy: 'no-referrer',
        },
      )

      const payload = await response.json()
      if (response.status === 200) {
        return toast(t('notifications.success'), {
          type: 'success',
          autoClose: 3000,
        })
      }

      if (response.status === 404 || response.status === 400) {
        toast(payload.message, { type: 'warning', autoClose: 5000 })
      } else {
        toast(payload.message, { type: 'error', autoClose: false })
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast(e.message, { type: 'error', autoClose: false })
        throw e
      }
    }
  }

  return (
    <div className='mx-auto max-w-2xl p-8'>
      <form
        className='space-y-6'
        onSubmit={handleSubmit(onSubmit)}>
        <header>
          <h2 className='mb-3 text-2xl font-bold leading-7 tracking-tight text-gray-900'>
            {t('title')}
          </h2>
          <p className='text-sm text-gray-600'>{t('subtitle')}</p>
        </header>
        <hr className='border-b-1' />
        <section>
          <h3 className='mb-2 mt-10 text-xl font-semibold'>
            {t('basic.title')}
          </h3>
          <article className='mb-6'>
            <FieldDescription
              title={t('basic.formLabels.rolesTitle')}
              description={t('basic.formLabels.rolesSubtitle')}
            />
            <div className='space-y-3'>
              {roles.map((role) => (
                <div
                  key={role.id}
                  className='flex items-center gap-x-3'>
                  <input
                    className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600'
                    id={role.id}
                    type='radio'
                    value={role.value}
                    {...register('role')}
                  />
                  <label
                    htmlFor={role.id}
                    className='block text-sm font-light leading-6 text-gray-900'>
                    {role.label}
                  </label>
                </div>
              ))}

              {errors.role && <ErrorMessage message={errors.role.message} />}
            </div>
          </article>

          <article className='mb-6'>
            <FieldDescription
              title={t('basic.formLabels.languagesTitle')}
              description={t('basic.formLabels.languagesSubtitle')}
            />

            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                data-testid='ccpp-spoken-languages'
                type='text'
                id='spokenLanguages'
                autoComplete='spokenLanguages'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder={t('basic.formLabels.languagesPlaceholder')}
                {...register('spokenLanguages')}
              />
            </div>

            {errors.spokenLanguages && (
              <ErrorMessage message={errors.spokenLanguages.message} />
            )}
          </article>

          <article className='mb-6'>
            <FieldDescription
              title={t('basic.formLabels.softTitle')}
              description={t('basic.formLabels.softSubtitle')}
            />
            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                type='text'
                id='mainSoftSkills'
                autoComplete='mainSoftSkills'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder={t('basic.formLabels.softPlaceholder')}
                {...register('mainSoftSkills')}
              />
            </div>

            {errors.mainSoftSkills && (
              <ErrorMessage message={errors.mainSoftSkills.message} />
            )}
          </article>

          <article className='mb-6'>
            <FieldDescription
              title={t('basic.formLabels.locationTitle')}
              description={t('basic.formLabels.locationSubtitle')}
            />

            <select
              id='location'
              defaultValue='Colombia'
              autoComplete='location'
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6'
              {...register('location')}>
              {countries.map((country) => (
                <option
                  key={country}
                  value={country}>
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
          <h3 className='mb-2 mt-10 text-xl font-semibold'>
            {t('techData.title')}
          </h3>

          <article className='mb-3'>
            <FieldDescription
              title={t('techData.formLabels.techSkillsTitle')}
              description={t('techData.formLabels.techSkillsSubtitle')}
            />

            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                type='text'
                id='techSkills'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder={t('techData.formLabels.techSkillsPlaceholder')}
                {...register('technicalData.techSkills')}
              />
            </div>

            {errors.technicalData?.techSkills && (
              <ErrorMessage message={errors.technicalData.techSkills.message} />
            )}
          </article>

          <article className='mb-3'>
            <FieldDescription
              title={t('techData.formLabels.proLangTitle')}
              description={t('techData.formLabels.proLangSubtitle')}
            />

            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                type='text'
                id='programmingLanguages'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder={t('techData.formLabels.proLangPlaceholder')}
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
              title={t('techData.formLabels.rolesTitle')}
              description={t('techData.formLabels.rolesSubtitle')}
            />

            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                type='text'
                id='roles'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder={t('techData.formLabels.rolesPlaceholder')}
                {...register('technicalData.roles')}
              />
            </div>

            {errors.technicalData?.roles && (
              <ErrorMessage message={errors.technicalData.roles.message} />
            )}
          </article>

          <article className='mb-3'>
            <FieldDescription
              title={t('techData.formLabels.yearsOfExpTitle')}
            />

            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                min={0}
                max={50}
                type='number'
                id='yearsOfExperience'
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
          <h3 className='mb-2 mt-10 text-xl font-semibold'>
            {t('academicData.title')}
          </h3>

          <article className='mb-6'>
            <FieldDescription
              title={t('academicData.formLabels.certificationsTitle')}
              description={t('academicData.formLabels.certificationsSubtitle')}
            />

            <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
              <input
                type='text'
                id='certifications'
                autoComplete='certifications'
                className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder={t(
                  'academicData.formLabels.certificationsPlaceholder',
                )}
                {...register('certifications')}
              />
            </div>

            {errors.certifications && (
              <ErrorMessage message={errors.certifications.message} />
            )}
          </article>

          <article>
            <FieldDescription
              title={t('academicData.formLabels.additionalStudies')}
            />
            {educationSections.map((section, index) => (
              <div key={uuidv4()}>
                <div className='mb-3'>
                  <FieldDescription
                    title={t('academicData.formLabels.schoolTitle')}
                  />

                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      type='text'
                      id='schoolName'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder={t(
                        'academicData.formLabels.schoolPlaceholder',
                      )}
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
                  <FieldDescription
                    title={t('academicData.formLabels.degreeTitle')}
                  />

                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      type='text'
                      id='obtainedDegree'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder={t(
                        'academicData.formLabels.degreePlaceholder',
                      )}
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
                    <FieldDescription
                      title={t('academicData.formLabels.startDate')}
                    />

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
                    <FieldDescription
                      title={t('academicData.formLabels.endDate')}
                    />

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
                  <FieldDescription
                    title={t('academicData.formLabels.gradeTitle')}
                  />

                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      min={0}
                      max={5}
                      type='number'
                      id='grade'
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
                  onClick={() => removeEducationSection(index)}>
                  {t('academicData.removeButton')}
                </button>
              </div>
            ))}

            <button
              type='button'
              className='rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold leading-6'
              onClick={addEducationSection}>
              {t('academicData.addMoreEducation')}
            </button>
          </article>
        </section>
        <section>
          <h3 className='mb-2 mt-10 text-xl font-semibold'>
            {t('expData.title')}
          </h3>

          <article>
            {experiences.map((section, index) => (
              <div key={uuidv4()}>
                <div className='mb-3'>
                  <FieldDescription
                    title={t('expData.formLabels.titleTitle')}
                  />

                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      type='text'
                      id='title'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder={t('expData.formLabels.titlePlaceholder')}
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
                  <FieldDescription
                    title={t('expData.formLabels.companyTitle')}
                  />

                  <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md'>
                    <input
                      type='text'
                      id='company'
                      className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                      placeholder={t('expData.formLabels.companyPlaceholder')}
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
                  <FieldDescription
                    title={t('expData.formLabels.employmentTitle')}
                  />

                  <select
                    id='expEmployment'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6'
                    {...register(`experienceData.${index}.employment`)}>
                    <option value='Full-Time'>
                      {t('expData.formLabels.empFull')}
                    </option>
                    <option value='Part-Time'>
                      {t('expData.formLabels.empPart')}
                    </option>
                    <option value='Contract'>
                      {t('expData.formLabels.empCont')}
                    </option>
                    <option value='Freelance'>
                      {t('expData.formLabels.empFree')}
                    </option>
                    <option value='Internship'>
                      {t('expData.formLabels.empInt')}
                    </option>
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
                    <FieldDescription
                      title={t('expData.formLabels.startDate')}
                    />

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
                    <FieldDescription title={t('expData.formLabels.endDate')} />

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
                  <FieldDescription title={t('expData.formLabels.roleTitle')} />

                  <select
                    id='expRole'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6'
                    {...register(`experienceData.${index}.role`)}>
                    <option value='backend'>
                      {t('expData.formLabels.roleBack')}
                    </option>
                    <option value='frontend'>
                      {t('expData.formLabels.roleFront')}
                    </option>
                    <option value='fullstack'>
                      {t('expData.formLabels.roleFull')}
                    </option>
                    <option value='devops'>
                      {t('expData.formLabels.roleDevOps')}
                    </option>
                    <option value='architect'>
                      {t('expData.formLabels.roleArch')}
                    </option>
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
                  onClick={() => removeExperienceSection(index)}>
                  {t('expData.removeButton')}
                </button>
              </div>
            ))}

            <button
              type='button'
              className='rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold leading-6'
              onClick={addExperienceSection}>
              {t('expData.addMoreExp')}
            </button>
          </article>
        </section>

        <div className='flex space-x-2'>
          <button
            type='reset'
            className='flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200'>
            {t('cancelButton')}
          </button>

          <button
            data-testid='ccpp-submit-button'
            disabled={!isValid || isSubmitSuccessful}
            type='submit'
            className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-blue-200'>
            {t('sendButton')}
          </button>
        </div>
      </form>
    </div>
  )
}
