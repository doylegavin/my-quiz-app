"use client";

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { StarIcon as StarIconOutline } from 'lucide-react';
import { StarIcon } from '@heroicons/react/24/solid';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  renderOption?: (option: string) => React.ReactNode;
}

export default function Autocomplete({
  value,
  onChange,
  options,
  placeholder = "Search...",
  renderOption,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Filter options based on search term (unless showAllOptions is true)
  const filteredOptions = showAllOptions 
    ? options
    : (searchTerm.trim() === '' 
        ? options 
        : options.filter(option => 
            option.toLowerCase().includes(searchTerm.toLowerCase())
          ));

  // Set search term to current value when value changes
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Reset focused index when options change or dropdown opens/closes
  useEffect(() => {
    setFocusedIndex(-1);
  }, [isOpen, filteredOptions]);

  // Handle clicks outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowAllOptions(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setShowAllOptions(!isOpen); // When toggling with the arrow, show all options
    if (!isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setIsOpen(true);
        setShowAllOptions(true);
        return;
      }
    }

    if (filteredOptions.length === 0) return;

    // Handle different key presses
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prevIndex => {
          const newIndex = prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0;
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
          const newIndex = prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1;
          // Scroll the focused option into view
          if (optionRefs.current[newIndex]) {
            optionRefs.current[newIndex]?.scrollIntoView({ block: 'nearest' });
          }
          return newIndex;
        });
        break;
      
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          selectOption(filteredOptions[focusedIndex]);
        }
        break;
      
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setShowAllOptions(false);
        inputRef.current?.blur();
        break;
      
      case 'Tab':
        setIsOpen(false);
        setShowAllOptions(false);
        break;
    }
  };

  const selectOption = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setShowAllOptions(false);
  };

  // Initialize option refs array when options change
  useEffect(() => {
    optionRefs.current = Array(filteredOptions.length).fill(null);
  }, [filteredOptions.length]);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowAllOptions(false); // When typing, filter based on input
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-black pr-10"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="autocomplete-options"
          aria-autocomplete="list"
        />
        <div 
          className="absolute right-2 cursor-pointer"
          onClick={toggleDropdown}
          aria-label={isOpen ? "Close options" : "Show options"}
        >
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>
      
      {isOpen && filteredOptions.length > 0 && (
        <div 
          ref={listRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          id="autocomplete-options"
          role="listbox"
        >
          {filteredOptions.map((option, index) => (
            <div
              ref={el => { optionRefs.current[index] = el; }}
              key={option}
              className={`px-4 py-2 cursor-pointer ${
                option === value ? 'font-bold' : ''
              } ${focusedIndex === index ? 'bg-blue-100' : 'hover:bg-gray-100'} text-black`}
              onClick={() => selectOption(option)}
              role="option"
              aria-selected={focusedIndex === index}
              tabIndex={-1}
            >
              {renderOption ? renderOption(option) : option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 