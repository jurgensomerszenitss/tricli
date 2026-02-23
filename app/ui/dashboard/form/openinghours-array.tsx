
import { useFieldArray } from "react-hook-form"; 

type Props = {
    control: any,
    register: any,
    errors: any
}

export default function OpeningHoursArray({ control, register, errors }: Props) {
    const { fields } = useFieldArray({
        control,
        name: "openingHours", // Must match the field name in your schema
    });

    const days: string[] = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

    let hours = [];
    for (let i = 0; i < 24; i++) { 
        hours.push(`${i.toString().padStart(2,'0')}:00`)
        hours.push(`${i.toString().padStart(2,'0')}:30`)
    } 

    return (
        <div>
            {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-y-2">
                    <div className="grid grid-cols-[24px_70px_70px_1fr] gap-x-2 h-10 place-items-center">
                        {/* Day */}
                        <label htmlFor={`openingHours.${index}.day`} className="field-label text-right">
                            {days[index]}
                        </label>

                        {/* From */}
                        <select  className="form-field-select" {...register(`openingHours.${index}.from`)}>
                            <option></option>
                            {hours.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        
                        {/* To */}
                         <select className="form-field-select"  {...register(`openingHours.${index}.to`)}>
                            <option value={undefined}></option>
                            {hours.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select> 
                        <div>
                            {errors.openingHours?.[index]?.from && (<p className="form-field-error">{errors.openingHours[index]?.from?.message}</p>)}
                            {errors.openingHours?.[index]?.to && (<p className="form-field-error">{errors.openingHours[index]?.to?.message}</p>)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}