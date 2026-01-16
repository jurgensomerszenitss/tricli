 
import { useFieldArray } from "react-hook-form";
import Image from 'next/image';

type Props = {
    control :any,
    register : any,
    errors : any
}

export default function TableArray({ control, register, errors }: Props) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "tables", // Must match the field name in your schema
    });

    return (
        <div>
            {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col">
                    <div className="grid grid-cols-6 gap-x-4 justify-items-stretch w-full">
                        {/* Number */}
                        <div className="col-span-1">
                            <label htmlFor={`tables.${index}.number`} className="field-label">
                                Number
                            </label>
                            <div className="relative">
                                <input
                                    {...register(`tables.${index}.number`, { valueAsNumber: true })}
                                    type="number"
                                    placeholder="Enter number"
                                    className="form-field"
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="col-span-4">
                            <label htmlFor={`tables.${index}.info`} className="field-label">
                                Info
                            </label>
                            <div className="flex flex-row items-center">
                                <input
                                    {...register(`tables.${index}.info`)}
                                    type="text"
                                    placeholder="Enter info"
                                    className="form-field mr-2"
                                />
                                <input
                                    {...register(`tables.${index}.isOutside`)}
                                    type="checkbox"
                                    className="form-field-checkbox"
                                />
                                <Image alt='terrace'
                                    src='/terrace.svg'
                                    width={20}
                                    height={20}></Image>
                            </div>
                        </div>

                        <div className="col-span-1 flex justify-end align-bottom items-center">
                            <div onClick={() => remove(index)} className="button-form-red">-</div>
                        </div>
                    </div>
                    <div id="tables-error" aria-live="polite" aria-atomic="true">
                        {errors.tables?.[index]?.number && (<p className="form-field-error">{errors.tables[index]?.number?.message}</p>)}
                        {/* {state.errors?.tables?.[index]?.number && state.tables[index]?.number.map((error: string) => (<p className="form-field-error" key={error}>{error}</p>))} */}
                    </div>
                </div>
            ))}
            <div onClick={() => append({ number: 0, info: '', isOutside: false })} className="button-form my-4">+</div>
        </div>
    )
}