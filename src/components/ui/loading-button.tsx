"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { ButtonProps } from "@/components/ui/button"

interface LoadingButtonProps extends ButtonProps {
  loading: boolean
  defaultText: string
  loadingText: string
}

export default function LoadingButton({
  loading,
  defaultText,
  loadingText,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={loading || disabled}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        defaultText
      )}
    </Button>
  )
} 