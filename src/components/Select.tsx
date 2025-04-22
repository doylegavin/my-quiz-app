"use client";

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  title?: string;
}

export default function Select({ value, onChange, options, title }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Find the selected option
  const selectedOption = options.find(option => option.value === value);
  
  // Reset focused index when the dropdown opens/closes
  useEffect(() => {
    if (isOpen) {
      // Set initial focus to the currently selected option
      const selectedIndex = options.findIndex(option => option.value === value);
      setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen, options, value]);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);
  
  // Initialize option refs array when options change
  useEffect(() => {
    optionRefs.current = Array(options.length).fill(null);
  }, [options.length]);
  
  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
        return;
      }
    }
    
    // If dropdown is open, handle navigation
    if (isOpen) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prevIndex => {
            // Find the next non-disabled option
            let newIndex = prevIndex;
            do {
              newIndex = (newIndex + 1) % options.length;
              // Avoid infinite loop if all options are disabled
              if (newIndex === prevIndex) break;
            } while (options[newIndex].disabled);
            
            // Scroll the focused option into view
            if (optionRefs.current[newIndex]) {
              optionRefs.current[newIndex]?.scrollIntoView({ block: 'nearest' });
            }
            return newIndex;
          });
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prevIndex => {
            // Find the previous non-disabled option
            let newIndex = prevIndex;
            do {
              newIndex = (newIndex - 1 + options.length) % options.length;
              // Avoid infinite loop if all options are disabled
              if (newIndex === prevIndex) break;
            } while (options[newIndex].disabled);
            
            // Scroll the focused option into view
            if (optionRefs.current[newIndex]) {
              optionRefs.current[newIndex]?.scrollIntoView({ block: 'nearest' });
            }
            return newIndex;
          });
          break;
          
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0 && !options[focusedIndex].disabled) {
            selectOption(options[focusedIndex].value);
          }
          break;
          
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          buttonRef.current?.blur();
          break;
          
        case 'Tab':
          setIsOpen(false);
          break;
          
        // Allow typing the first letter to jump to an option
        default:
          if (e.key.length === 1 && e.key.match(/[a-z0-9]/i)) {
            const char = e.key.toLowerCase();
            const matchingIndex = options.findIndex((option, index) => 
              index > focusedIndex && !option.disabled && option.label.toLowerCase().startsWith(char)
            );
            
            if (matchingIndex >= 0) {
              setFocusedIndex(matchingIndex);
              optionRefs.current[matchingIndex]?.scrollIntoView({ block: 'nearest' });
            } else {
              // If no match after current index, start from the beginning
              const firstMatch = options.findIndex(option => 
                !option.disabled && option.label.toLowerCase().startsWith(char)
              );
              if (firstMatch >= 0) {
                setFocusedIndex(firstMatch);
                optionRefs.current[firstMatch]?.scrollIntoView({ block: 'nearest' });
              }
            }
          }
          break;
      }
    }
  };
  
  const selectOption = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    buttonRef.current?.focus();
  };
  
  // Handle mouse enter on option
  const handleOptionMouseEnter = (index: number) => {
    if (!options[index].disabled) {
      setFocusedIndex(index);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-1 focus:ring-blue-400"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={title ? undefined : "select-label"}
        id="select-button"
      >
        <span className="truncate" id="select-label">
          {title || selectedOption?.label || 'Select an option'}
        </span>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>
      
      {isOpen && (
        <div 
          ref={listRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          role="listbox"
          aria-labelledby="select-label"
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <div
              ref={el => { optionRefs.current[index] = el; }}
              key={option.value}
              className={`px-4 py-2 cursor-pointer ${
                option.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-black'
              } ${option.value === value ? 'font-bold' : ''} ${
                focusedIndex === index && !option.disabled ? 'bg-blue-100' : ''
              } ${!option.disabled ? 'hover:bg-gray-100' : ''}`}
              onClick={() => {
                if (!option.disabled) {
                  selectOption(option.value);
                }
              }}
              onMouseEnter={() => handleOptionMouseEnter(index)}
              role="option"
              aria-selected={option.value === value}
              aria-disabled={option.disabled}
              tabIndex={-1}
              data-value={option.value}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 