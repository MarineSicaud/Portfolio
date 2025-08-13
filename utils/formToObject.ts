function formToObject<T>(formData: FormData): T {
  let obj: Partial<T> = {};

  formData.forEach((value, key) => {
    if ( typeof value === "string"){
      try {
        (obj as any)[key as keyof T] = JSON.parse(value);
      }catch {
        (obj as any)[key as keyof T] = value;
      }
    }else {
      (obj as any)[key as keyof T] = value;
    }
  })

  return obj as T
}

export { formToObject }
