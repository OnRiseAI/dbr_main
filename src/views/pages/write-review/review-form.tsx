'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUploadIcon, XIcon, AlertCircleIcon } from 'lucide-react'

// Type Imports
import type { Product } from '@/types/product'

// Component Imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Rating } from '@/components/ui/rating'
import StarRatingDisplay from '@/components/blocks/star-rating-display'
import { writeReviewSchema, type WriteReviewValues } from './write-review-schema'

// Store Imports
import { useProductsStore } from '@/store/products-store'

// Hook Imports
import { useFileUpload, formatBytes } from '@/hooks/use-file-upload'

// Utils Imports
import { cn } from '@/lib/utils'

type Props = {
  product: Product
}

type SubmittedReview = {
  rating: number
  title: string
  description: string
  date: string
}

const ReviewForm = ({ product }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [submittedReview, setSubmittedReview] = useState<SubmittedReview | null>(null)
  const addReview = useProductsStore(state => state.addReview)

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      removeFile,
      clearFiles,
      openFileDialog,
      getInputProps
    }
  ] = useFileUpload({
    maxWidth: 800,
    maxHeight: 400,
    multiple: true,
    maxFiles: 5,
    accept: 'image/png,image/jpeg,image/gif,.png,.jpg,.jpeg,.gif'
  })

  const form = useForm<WriteReviewValues>({
    resolver: zodResolver(writeReviewSchema),
    defaultValues: {
      rating: 0,
      title: '',
      description: '',
      recommend: 'no',
      terms: false
    }
  })

  const onSubmit = (values: WriteReviewValues) => {
    try {
      setIsSubmitting(true)
      setSubmitMessage(null)

      addReview(product.id, {
        rating: values.rating,
        text: values.description,
        author: 'You',
        photos: files.length > 0 ? files.map(f => (f.file instanceof File ? f.file.name : f.file.name)) : undefined
      })

      setSubmittedReview({
        rating: values.rating,
        title: values.title,
        description: values.description,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      })

      setSubmitMessage({ type: 'success', text: 'Review submitted successfully!' })
      form.reset()
      clearFiles()
    } catch {
      setSubmitMessage({ type: 'error', text: 'Failed to submit review. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (submitMessage?.type === 'success') {
      const timer = setTimeout(() => {
        setSubmitMessage(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [submitMessage])

  return (
    <div className='bg-muted space-y-6 rounded-md p-6'>
      <h2 className='mb-3.5 text-xl font-semibold'>Add Review</h2>

      {submitMessage && (
        <div
          className={`rounded-md p-3 text-sm ${
            submitMessage.type === 'success'
              ? 'bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400'
              : 'bg-distructive/10 text-destructive'
          }`}
        >
          {submitMessage.text}
        </div>
      )}

      {submittedReview && (
        <div className='border-border bg-card space-y-4 rounded-lg border p-4'>
          <div>
            <h3 className='mb-2 font-semibold'>Your Review</h3>
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <StarRatingDisplay value={submittedReview.rating} />
                <span className='text-muted-foreground text-sm'>{submittedReview.date}</span>
              </div>
              <div>
                <p className='font-medium'>{submittedReview.title}</p>
                <p className='text-muted-foreground mt-1 text-sm'>{submittedReview.description}</p>
              </div>
            </div>
          </div>
          <Button
            type='button'
            variant='outline'
            size='sm'
            render={<Link href={`/product/${product.id}#reviews`} />}
            nativeButton={false}
          >
            View on Product Page
          </Button>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='rating'
            render={({ field }) => (
              <FormItem className='space-y-2.5'>
                <div className='flex items-center gap-3'>
                  <FormControl>
                    <Rating
                      value={field.value}
                      onValueChange={field.onChange}
                      variant='yellow'
                      precision={0.5}
                      size={20}
                    />
                  </FormControl>
                  {field.value > 0 && <span className='text-base font-medium'>{field.value.toFixed(1)} out of 5</span>}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='gap-3.5'>
                <FormLabel className='text-sm font-medium'>Review title</FormLabel>
                <FormControl>
                  <Input placeholder='Type Here' {...field} className='input-lg bg-white' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='mb-1.5 text-sm font-medium'>Review description</FormLabel>
                <FormControl>
                  <Textarea placeholder='Type Here' {...field} className='bg-white' />
                </FormControl>
                <p className='text-muted-foreground text-sm'>
                  Problems with the product or delivery?{' '}
                  <Button
                    variant='link'
                    className='h-auto p-0 font-normal underline underline-offset-2'
                    render={<a href='#' />}
                    nativeButton={false}
                  >
                    Send a report.
                  </Button>
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='mb-3.5 space-y-3.5'>
            <p className='text-sm font-medium'>
              Add real photos of the product to help other customers{' '}
              <span className='text-muted-foreground'>(Optional)</span>
            </p>
            <div
              className={cn(
                'bg-card border-border flex flex-col justify-center rounded-xl border-2 border-dashed transition-colors',
                isDragging && 'border-primary bg-primary/5'
              )}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Button
                variant='link'
                onClick={openFileDialog}
                className='hover:bg-card h-auto flex-col gap-1.5 p-10 text-center font-normal whitespace-normal hover:no-underline'
              >
                <CloudUploadIcon className='mb-3 size-6' />
                <span className='text-muted-foreground text-sm'>
                  <span className='text-foreground font-medium'>Click to upload</span> or drag and drop
                </span>
                <span className='text-muted-foreground text-sm'>PNG, JPG or GIF (MAX. 800x400px)</span>
              </Button>
              <input {...getInputProps()} className='hidden' />
            </div>

            {errors.length > 0 && (
              <div className='text-destructive flex items-center gap-2 text-sm' role='alert'>
                <AlertCircleIcon className='size-4 shrink-0' />
                <span>{errors[0]}</span>
              </div>
            )}

            {files.length > 0 && (
              <div className='space-y-2'>
                <p className='text-sm font-medium'>Uploaded files ({files.length})</p>
                <div className='space-y-2'>
                  {files.map(file => (
                    <div key={file.id} className='bg-primary/10 flex items-center justify-between rounded-lg p-3'>
                      <div className='flex-1'>
                        <p className='truncate text-sm font-medium'>
                          {file.file instanceof File ? file.file.name : file.file.name}
                        </p>
                        <p className='text-muted-foreground text-xs'>
                          {formatBytes(file.file instanceof File ? file.file.size : file.file.size)}
                        </p>
                      </div>
                      <Button type='button' variant='outline' size='icon-sm' onClick={() => removeFile(file.id)}>
                        <XIcon className='size-4' />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <FormField
            control={form.control}
            name='recommend'
            render={({ field }) => (
              <FormItem className='mb-3.5'>
                <div className='flex flex-wrap gap-3 sm:gap-7'>
                  <FormLabel className='leading-5 font-medium'>Do you recommend this product?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className='flex w-auto flex-row items-center gap-7'
                    >
                      <div className='flex items-center gap-1.5'>
                        <RadioGroupItem
                          value='yes'
                          id='recommend-yes'
                          className='size-5 bg-white [&_[data-slot=radio-group-indicator]>span]:size-2.75'
                        />
                        <Label htmlFor='recommend-yes' className='text-sm'>
                          Yes
                        </Label>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <RadioGroupItem
                          value='no'
                          id='recommend-no'
                          className='size-5 bg-white [&_[data-slot=radio-group-indicator]>span]:size-2.75'
                        />
                        <Label htmlFor='recommend-no' className='text-sm'>
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='terms'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-start gap-1.5'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className='mt-0.5 size-5 bg-white'
                    />
                  </FormControl>
                  <FormLabel className='text-muted-foreground inline text-sm leading-normal'>
                    By publishing this review you agree with the{' '}
                    <Button
                      variant='link'
                      className='h-auto p-0 align-baseline text-xs underline underline-offset-2'
                      render={<Link href='/privacy-policy' />}
                      nativeButton={false}
                    >
                      terms and conditions.
                    </Button>
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex gap-5'>
            <Button size='lg' className='px-4' disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit review'}
            </Button>
            <Button size='lg' variant='outline' className='px-4' onClick={() => form.reset()} disabled={isSubmitting}>
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ReviewForm
