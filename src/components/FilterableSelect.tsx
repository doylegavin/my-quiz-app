"use client";

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { Search } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FilterableSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  title?: string;
  placeholder?: string;
}

export default function FilterableSelect({ 
  value, 
  onChange, 
  options, 
  title,
  placeholder = "Search..."
}: FilterableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Find the selected option
  const selectedOption = options.find(option => option.value === value);
  
  // Filter options based on search term
  const filteredOptions = searchTerm.trim() === '' 
    ? options 
    : options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
  // Reset focused index when the dropdown opens/closes or filtered options change
  useEffect(() => {
    if (isOpen) {
      // Set initial focus to the currently selected option if it's in the filtered list
      const selectedIndex = filteredOptions.findIndex(option => option.value === value);
      setFocusedIndex(selectedIndex >= 0 ? selectedIndex : -1);
    } else {
      setFocusedIndex(-1);
      setSearchTerm(''); // Clear search when dropdown closes
    }
  }, [isOpen, filteredOptions, value]);

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
  
  // Initialize option refs array when filtered options change
  useEffect(() => {
    optionRefs.current = Array(filteredOptions.length).fill(null);
  }, [filteredOptions.length]);
  
  // Focus the search input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [isOpen]);
  
  // Handle button keyboard navigation
  const handleButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
        return;
      }
    }
  };
  
  // Handle search input keyboard navigation
  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // If no options after filtering, no keyboard navigation
    if (filteredOptions.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prevIndex => {
          // Find the next non-disabled option
          let newIndex = prevIndex;
          do {
            newIndex = (newIndex + 1) % filteredOptions.length;
            // Avoid infinite loop if all options are disabled
            if (newIndex === prevIndex) break;
          } while (filteredOptions[newIndex].disabled);
          
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
          let newIndex = prevIndex < 0 ? filteredOptions.length - 1 : prevIndex;
          do {
            newIndex = (newIndex - 1 + filteredOptions.length) % filteredOptions.length;
            // Avoid infinite loop if all options are disabled
            if (newIndex === prevIndex) break;
          } while (filteredOptions[newIndex].disabled);
          
          // Scroll the focused option into view
          if (optionRefs.current[newIndex]) {
            optionRefs.current[newIndex]?.scrollIntoView({ block: 'nearest' });
          }
          return newIndex;
        });
        break;
        
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && !filteredOptions[focusedIndex].disabled) {
          selectOption(filteredOptions[focusedIndex].value);
        } else if (filteredOptions.length === 1 && !filteredOptions[0].disabled) {
          // Auto-select if there's only one filtered option
          selectOption(filteredOptions[0].value);
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
        
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };
  
  const selectOption = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    buttonRef.current?.focus();
  };
  
  // Handle mouse enter on option
  const handleOptionMouseEnter = (index: number) => {
    if (!filteredOptions[index].disabled) {
      setFocusedIndex(index);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleButtonKeyDown}
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
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden"
        >
          {/* Search input */}
          <div className="p-2 border-b border-gray-200 flex items-center">
            <Search className="h-4 w-4 text-gray-400 ml-1 mr-2" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder={placeholder}
              className="w-full p-1 outline-none text-sm"
              aria-label="Search options"
            />
          </div>
          
          {/* Options list */}
          <div 
            ref={listRef}
            className="max-h-60 overflow-y-auto"
            role="listbox"
            aria-labelledby="select-label"
            tabIndex={-1}
          >
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-gray-500 text-center">No results found</div>
            ) : (
              filteredOptions.map((option, index) => (
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
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
} 