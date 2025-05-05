"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Share2, Download } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import React, { useState } from "react";

interface LearningStyle {
  key: string;
  name: string;
  percentage: number;
  description: string;
  strategies: string[];
}

interface ResultsCardProps {
  results: {
    sortedStyles: LearningStyle[];
    primaryStyle: Omit<LearningStyle, 'key'>;
    secondaryStyle: Omit<LearningStyle, 'key'>;
    isMultimodal: boolean;
  };
  onReset: () => void;
}

export default function ResultsCard({ results, onReset }: ResultsCardProps) {
  const { sortedStyles, primaryStyle, secondaryStyle, isMultimodal } = results;
  const [shareTooltip, setShareTooltip] = useState("");
  
  // Color mapping for each learning style
  const colorMap: Record<string, string> = {
    V: "#3b82f6", // blue-500
    A: "#22c55e", // green-500
    R: "#a855f7", // purple-500
    K: "#f97316", // orange-500
  };
  
  // Format data for Recharts
  const chartData = sortedStyles.map(style => ({
    name: style.name,
    value: style.percentage,
    key: style.key
  }));
  
  // Create share text
  const createShareText = () => {
    const text = `I'm ${primaryStyle.percentage}% ${primaryStyle.name} learner! ${
      isMultimodal 
        ? `I also prefer ${secondaryStyle.name} learning (${secondaryStyle.percentage}%).` 
        : ''
    } Discover your learning style with VARK assessment.`;
    
    return text;
  };
  
  // Copy share text to clipboard
  const handleShare = async () => {
    const shareText = createShareText();
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My VARK Learning Style Results',
          text: shareText,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setShareTooltip("Copied to clipboard!");
        setTimeout(() => setShareTooltip(""), 2000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  
  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };
  
  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-center">Your Learning Style Results</CardTitle>
        <CardDescription className="text-center">
          {isMultimodal 
            ? "You have a multimodal learning preference" 
            : `Your primary learning style is ${primaryStyle.name}`}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Results chart */}
        <motion.div 
          className="h-72 w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            delay: 0.3
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              barCategoryGap={30}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Score']}
                contentStyle={{ borderRadius: '8px' }}
              />
              <Bar 
                dataKey="value" 
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colorMap[entry.key]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        
        {/* Learning style details */}
        <Tabs defaultValue={sortedStyles[0].key} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            {sortedStyles.map(style => (
              <TabsTrigger 
                key={style.key} 
                value={style.key}
                className="text-xs sm:text-sm"
              >
                {style.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {sortedStyles.map((style, index) => (
            <TabsContent key={style.key} value={style.key} className="space-y-4">
              <motion.div
                custom={index}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
              >
                <h3 className="font-semibold text-lg mb-2">{style.name} Learning Style</h3>
                <p className="text-gray-700">{style.description}</p>
              </motion.div>
              
              <motion.div
                custom={index + 1}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
              >
                <h4 className="font-semibold mb-2">Recommended Learning Strategies</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {style.strategies.map((strategy, i) => (
                    <li key={i} className="text-gray-700">{strategy}</li>
                  ))}
                </ul>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Multimodal explanation if applicable */}
        {isMultimodal && (
          <motion.div 
            className="bg-blue-50 p-4 rounded-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-semibold mb-2">About Your Multimodal Preference</h3>
            <p className="text-sm text-gray-700">
              You have strong preferences for multiple learning styles. 
              This means you can adapt to different teaching methods and might prefer 
              using different approaches depending on what you're learning.
            </p>
          </motion.div>
        )}
        
        {/* Share and Reset buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative" // For tooltip positioning
          >
            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Share2 size={16} />
              Share Results
            </Button>
            {shareTooltip && (
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                {shareTooltip}
              </span>
            )}
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onReset}
              className="w-full px-8 bg-gradient-to-r from-pink-500 to-purple-600 flex items-center gap-2"
            >
              Take Assessment Again
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
} 