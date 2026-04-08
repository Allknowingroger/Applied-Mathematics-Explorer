/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Microscope, Cpu, Calculator, ChevronRight, Sparkles, X, Loader2, HeartPulse } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Microscope, Cpu, Calculator, ChevronRight, Sparkles, X, Loader2, HeartPulse, TrendingUp, CloudSun, Database } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Microscope, Cpu, Calculator, ChevronRight, Sparkles, X, Loader2, HeartPulse, TrendingUp, CloudSun, Database, Shield, Wrench } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

const categories = [
  {
    title: 'Scientific and Industrial Fields',
    icon: Microscope,
    items: [
      { name: 'Physical Sciences', desc: 'Numerical methods for classical problems.' },
      { name: 'Astronomy', desc: 'Infinite series in celestial mechanics.' },
      { name: 'Fluid Dynamics', desc: 'Modeling complex flow behavior.' },
    ],
  },
  {
    title: 'Industry and Military',
    icon: Shield,
    items: [
      { name: 'Logistics Optimization', desc: 'Supply chain management and routing.' },
      { name: 'Ballistics', desc: 'Modeling projectile trajectories.' },
      { name: 'Cryptography', desc: 'Secure communication protocols.' },
    ],
  },
  {
    title: 'Engineering',
    icon: Wrench,
    items: [
      { name: 'Structural Analysis', desc: 'Stress and strain in materials.' },
      { name: 'Control Systems', desc: 'Feedback loops in robotics and automation.' },
      { name: 'Thermodynamics', desc: 'Heat transfer and energy efficiency.' },
    ],
  },
  {
    title: 'Technological Applications',
    icon: Cpu,
    items: [
      { name: 'AI and Text Recognition', desc: 'Driving recent advancements.' },
      { name: 'Computer Science', desc: 'Algorithms for discrete math and computation.' },
      { name: 'Digital Computing', desc: 'Changed the notion of proof (e.g., Four Color Theorem).' },
      { name: 'Modeling', desc: 'A distinct applied layer.' },
      { name: 'Software Packages', desc: 'E.g., Chebfun for approximation and optimization.' },
    ],
  },
  {
    title: 'Mathematical Methods and Tools',
    icon: Calculator,
    items: [
      { name: 'Numerical Analysis', desc: 'Clear-cut answers for empirical observations.' },
      { name: 'Stochastics', desc: 'Stochastic Differential Equations.' },
      { name: 'Place Value System', desc: 'Fundamental, everyday generality.' },
      { name: 'Graphical Methods', desc: 'From geometry to analog computing.' },
    ],
  },
  {
    title: 'Biological and Medical Fields',
    icon: HeartPulse,
    items: [
      { name: 'Epidemiology', desc: 'Modeling disease spread (SIR models).' },
      { name: 'Medical Imaging', desc: 'CT/MRI reconstruction (Radon transform).' },
      { name: 'Genetics', desc: 'Sequence alignment and bioinformatics.' },
      { name: 'Neuroscience', desc: 'Modeling neural networks and brain activity.' },
    ],
  },
  {
    title: 'Financial and Economic Models',
    icon: TrendingUp,
    items: [
      { name: 'Option Pricing', desc: 'Black-Scholes model for derivatives.' },
      { name: 'Risk Management', desc: 'Value at Risk (VaR) and stress testing.' },
      { name: 'Game Theory', desc: 'Strategic decision-making in markets.' },
      { name: 'Macroeconomics', desc: 'Dynamic Stochastic General Equilibrium (DSGE) models.' },
    ],
  },
  {
    title: 'Environmental and Climate Science',
    icon: CloudSun,
    items: [
      { name: 'Climate Modeling', desc: 'Simulating long-term global temperature trends.' },
      { name: 'Hydrology', desc: 'Groundwater flow and flood risk assessment.' },
      { name: 'Ecology', desc: 'Population dynamics and predator-prey models.' },
      { name: 'Renewable Energy', desc: 'Optimizing grid integration for wind/solar.' },
    ],
  },
  {
    title: 'Data Science and Analytics',
    icon: Database,
    items: [
      { name: 'Dimensionality Reduction', desc: 'PCA and t-SNE for high-dimensional data.' },
      { name: 'Clustering', desc: 'K-means and hierarchical grouping.' },
      { name: 'Regression Analysis', desc: 'Predictive modeling and trend forecasting.' },
      { name: 'Recommendation Systems', desc: 'Collaborative filtering and matrix factorization.' },
    ],
  },
];

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export default function App() {
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const generateExample = async (itemName: string) => {
    setLoading(true);
    setActiveItem(itemName);
    setGeneratedContent(null);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a short, interactive example or visualization description for the application of mathematics in: ${itemName}. Include code snippets where relevant. Keep it concise and engaging.`,
      });
      setGeneratedContent(response.text || 'No content generated.');
    } catch (error) {
      console.error('Error generating example:', error);
      setGeneratedContent('Failed to generate example. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900 p-6 md:p-12 font-sans">
      <header className="max-w-7xl mx-auto mb-16">
        <h1 className="text-5xl font-bold tracking-tighter text-gray-950 mb-6">Applied Mathematics Explorer</h1>
        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
          An interactive exploration of real-world applications of mathematics based on lecture insights.
        </p>
      </header>

      <main className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <category.icon size={28} />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">{category.title}</h2>
            </div>
            <ul className="space-y-6">
              {category.items.map((item) => (
                <li key={item.name} className="flex flex-col gap-2">
                  <div className="flex items-start gap-4">
                    <div className="mt-1.5 p-1 bg-blue-100 rounded-full">
                      <ChevronRight className="text-blue-600" size={14} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-950">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => generateExample(item.name)}
                    disabled={loading && activeItem === item.name}
                    className="ml-8 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    {loading && activeItem === item.name ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Sparkles size={16} />
                    )}
                    Generate Example
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </main>

      <AnimatePresence>
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-8 rounded-3xl shadow-2xl max-w-2xl w-full relative max-h-[80vh] overflow-y-auto"
            >
              <button
                onClick={() => setGeneratedContent(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-semibold mb-6 text-gray-950">Example: {activeItem}</h3>
              <div className="prose prose-blue max-w-none text-gray-700">
                <ReactMarkdown>{generatedContent}</ReactMarkdown>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
