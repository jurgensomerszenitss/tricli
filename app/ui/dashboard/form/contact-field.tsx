'use client';

type Props = {
    register: any;
    errors?: any,
    prefix?: string | undefined
}

export default function ContactField({ register, errors, prefix = 'contact' }: Props) { 
    return (
        <div className="grid md:grid-cols-3 xl:grid-cols-6 grid-cols-1 gap-x-8 justify-items-stretch w-full">
            {/* Phone */}
            <div className="mb-4">
                <label htmlFor="phone" className="field-label">
                    Phone
                </label>
                <div className="relative">
                    <input
                        {...register(`${prefix}.phone`)}
                        type="text"
                        placeholder="Enter phone"
                        className="form-field"
                    />
                </div>
                <div id="phone-error" aria-live="polite" aria-atomic="true">
                    {errors?.phone && (<p className="form-field-error">{errors.phone?.message}</p>)}
                </div>
            </div>

            {/* Email */}
            <div className="mb-4">
                <label htmlFor="email" className="field-label">
                    Email
                </label>
                <div className="relative">
                    <input
                        {...register(`${prefix}.email`)}
                        type="text"
                        placeholder="Enter email"
                        className="form-field"
                    />
                </div>
                <div id="email-error" aria-live="polite" aria-atomic="true">
                    {errors?.email && (<p className="form-field-error">{errors.email?.message}</p>)}
                </div>
            </div>

            {/* Website */}
            <div className="mb-4">
                <label htmlFor="website" className="field-label">
                    Website
                </label>
                <div className="relative">
                    <input
                        {...register(`${prefix}.website`)}
                        type="text"
                        placeholder="Enter website"
                        className="form-field"
                    />
                </div>
                <div id="website-error" aria-live="polite" aria-atomic="true">
                    {errors?.website && (<p className="form-field-error">{errors.website?.message}</p>)}
                </div>
            </div>
        </div> 
    )
}