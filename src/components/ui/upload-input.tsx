import type { ComponentProps, ReactNode } from "react";
import { useRef, useState } from "react";
import { tv } from "tailwind-variants";
import CloudIcon from "../../assets/icons/cloud.svg?react";
import {
  inputTextContainerVariants,
  inputTextVariants,
  inputTextWrapperVariants,
} from "./input-text";
import Text from "./text";

const uploadLabelVariants = tv({
  base: "text-gray-200 text-[10px]",
});

export const uploadButtonIconVariants = tv({
  base: "bg-green-100 hover:bg-green-200 transition self-stretch flex items-center justify-center w-12 rounded-r shrink-0 cursor-pointer",
});

const DEFAULT_ALLOWED_TYPES = [".pdf", ".png", ".jpg", ".jpeg"];
const DEFAULT_MAX_SIZE = 2 * 1024 * 1024; // 2MB

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${bytes / (1024 * 1024)}MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${bytes}B`;
}

interface UploadInputProps extends Omit<
  ComponentProps<"input">,
  "type" | "id" | "accept"
> {
  label?: string;
  id: string;
  placeholder?: string;
  error?: ReactNode;
  /** Extensions allowed, e.g. [".pdf", ".png"]. Defaults to [".pdf", ".png", ".jpg", ".jpeg"] */
  allowedTypes?: string[];
  /** Max file size in bytes. Defaults to 2MB */
  maxSize?: number;
}

export default function UploadInput({
  label,
  id,
  placeholder = "Nome do arquivo.pdf",
  onChange,
  disabled,
  className,
  error,
  allowedTypes = DEFAULT_ALLOWED_TYPES,
  maxSize = DEFAULT_MAX_SIZE,
  ...props
}: UploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("");
  const [fileError, setFileError] = useState("");

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = `.${file.name.split(".").pop()?.toLowerCase()}`;
    const isValidType = allowedTypes.some((t) => t.toLowerCase() === extension);

    if (file.size > maxSize) {
      setFileError(`Arquivo muito grande. Máximo: ${formatBytes(maxSize)}`);
      setFilename("");
      e.target.value = "";
      return;
    }

    if (!isValidType) {
      const formatted = allowedTypes
        .map((t) => t.replace(".", "").toUpperCase())
        .join(", ");
      setFileError(`Formato inválido. Use: ${formatted}`);
      setFilename("");
      e.target.value = "";
      return;
    }

    setFileError("");
    setFilename(file.name);
    onChange?.(e);
  }

  const displayError = fileError || error;

  return (
    <div className={inputTextContainerVariants({ className })}>
      <label htmlFor={id} className={uploadLabelVariants()}>
        {label}
      </label>
      <div
        className={inputTextWrapperVariants({
          disabled: disabled as boolean,
          className: "pr-0 py-0",
        })}
      >
        <span className={`${inputTextVariants()} truncate py-3`}>
          {filename || <span className="text-placeholder">{placeholder}</span>}
        </span>
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={disabled as boolean}
          className={uploadButtonIconVariants()}
        >
          <CloudIcon className="w-5 h-5 fill-white" />
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        id={id}
        accept={allowedTypes.join(",")}
        className="hidden"
        onChange={handleChange}
        disabled={disabled as boolean}
        {...props}
      />
      {displayError && (
        <Text variant="body-sm" className="text-green-200">
          {displayError}
        </Text>
      )}
    </div>
  );
}
