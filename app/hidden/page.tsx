'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import mermaid from 'mermaid';

const PASSWORD = 'tiki';

export default function HiddenPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [zValue, setZValue] = useState('300,000');
  const [xValue, setXValue] = useState('500,000');
  const [yValue, setYValue] = useState('1,500,000');
  const [miscValue, setMiscValue] = useState('100,000');
  const [archEngValue, setArchEngValue] = useState('100,000');
  const [infrastructureValue, setInfrastructureValue] = useState('1,395,000');
  const [lotsValue, setLotsValue] = useState('24');
  const [lotPriceValue, setLotPriceValue] = useState('500,000');
  const parallaxRef = useRef<HTMLDivElement>(null);
  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  const [isParallaxFixed, setIsParallaxFixed] = useState(false);
  const [isDealFlowOpen, setIsDealFlowOpen] = useState(true);
  const [isDynamicValuesOpen, setIsDynamicValuesOpen] = useState(true);
  const [isPhaseOneOpen, setIsPhaseOneOpen] = useState(true);
  const [isPhaseTwoOpen, setIsPhaseTwoOpen] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated in this session
    const authStatus = sessionStorage.getItem('hiddenPageAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Initialize Mermaid once
  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    });
  }, []);

  // Make parallax section sticky when it reaches the top
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleScroll = () => {
      if (parallaxContainerRef.current) {
        const rect = parallaxContainerRef.current.getBoundingClientRect();
        // When the container reaches the top, make it fixed
        setIsParallaxFixed(rect.top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAuthenticated]);


  useEffect(() => {
    // Render Mermaid diagram when authenticated and values change
    if (isAuthenticated && mermaidRef.current) {
      const formatValue = (value: string) => {
        // Remove any existing dollar signs and commas, then format
        const cleaned = value.replace(/[$,]/g, '');
        const numValue = cleaned ? `$${cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : '$0';
        return numValue;
      };

      const diagramDefinition = `flowchart TD
          A["Step 1: Create Entity (Legal)"] --> B["Step 2: Buy 11ac Parcel<br/>for ${formatValue(zValue)}"]
          B --> C["Step 3: Buy Access House Parcel<br/>for ${formatValue(xValue)}"]
          C --> D["Step 4: Merge Parcels (Demo)"]
          D --> E{"Step 5: Sell Merged<br/>Parcels?"}
          E -->|Yes| F["Receive ${formatValue(yValue)}"]
          E -->|No| G["Develop Vision ${formatValue(archEngValue)}"]
          F --> H["Visionary ${formatCurrency(netCashflowZ)}"]
          F --> I["Plumber & The Other Guy ${formatCurrency(netCashflow)}"]
          G --> J["Infrastructure (Roads & Utilities) ${formatValue(infrastructureValue)}"]
          J --> K["Phase Two: Sell Lots ${formatCurrency(phaseTwoSell)}"]
          K --> L["Visionary ${formatCurrency(parseValue(zValue) + netCashflow2 / 3)}"]
          K --> M["Plumber & The Other Guy ${formatCurrency(netCashflow2 / 3)}"]`;
          

      // Render the diagram using async render
      const renderDiagram = async () => {
        if (mermaidRef.current) {
          try {
            // Clear previous content
            mermaidRef.current.innerHTML = '';
            // Generate unique ID for this render
            const uniqueId = `mermaid-diagram-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const { svg } = await mermaid.render(uniqueId, diagramDefinition);
            mermaidRef.current.innerHTML = svg;
          } catch (error) {
            console.error('Error rendering Mermaid diagram:', error);
            // Fallback: use class-based approach
            if (mermaidRef.current) {
              mermaidRef.current.innerHTML = '';
              mermaidRef.current.className = 'mermaid';
              mermaidRef.current.textContent = diagramDefinition;
              mermaid.contentLoaded();
            }
          }
        }
      };

      renderDiagram();
    }
  }, [isAuthenticated, zValue, xValue, yValue]);

  const parseValue = (value: string): number => {
    // Remove any existing dollar signs and commas, then parse
    const cleaned = value.replace(/[$,]/g, '');
    return cleaned ? parseFloat(cleaned) || 0 : 0;
  };

  const formatCurrency = (value: number): string => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const calculateThird = (value: string): number => {
    return parseValue(value) * (1/3);
  };

  const totalInvestment = parseValue(zValue) + parseValue(xValue) + parseValue(miscValue);
  const netCashflow = parseValue(yValue) - totalInvestment;
  const netCashflowZ = parseValue(zValue) + calculateThird(yValue) - totalInvestment;
  const totalInvestment2 = parseValue(archEngValue) + parseValue(infrastructureValue);
  const totalInvestmentGrandTotal = totalInvestment2 + totalInvestment;
  const phaseTwoSell = parseValue(lotsValue) * parseValue(lotPriceValue);
  const netCashflow2 = phaseTwoSell - totalInvestmentGrandTotal;
  const netCashflow2z = parseValue(zValue) + phaseTwoSell - totalInvestmentGrandTotal;


  const formatInputAsCurrency = (value: string): string => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '');
    
    // If empty, return empty string
    if (!digitsOnly) return '';
    
    // Parse as number and format with commas
    const numValue = parseInt(digitsOnly, 10);
    if (isNaN(numValue)) return '';
    
    // Format with commas
    return numValue.toLocaleString('en-US');
  };

  const handleZValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInputAsCurrency(e.target.value);
    setZValue(formatted);
  };

  const handleXValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInputAsCurrency(e.target.value);
    setXValue(formatted);
  };

  const handleYValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInputAsCurrency(e.target.value);
    setYValue(formatted);
  };

  const handleMiscValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInputAsCurrency(e.target.value);
    setMiscValue(formatted);
  };

  const handleZSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setZValue(value.toLocaleString('en-US'));
  };

  const handleXSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setXValue(value.toLocaleString('en-US'));
  };

  const handleYSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setYValue(value.toLocaleString('en-US'));
  };

  const handleMiscSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setMiscValue(value.toLocaleString('en-US'));
  };

  const handleArchEngValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInputAsCurrency(e.target.value);
    setArchEngValue(formatted);
  };

  const handleArchEngSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setArchEngValue(value.toLocaleString('en-US'));
  };

  const handleInfrastructureValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInputAsCurrency(e.target.value);
    setInfrastructureValue(formatted);
  };

  const handleInfrastructureSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setInfrastructureValue(value.toLocaleString('en-US'));
  };

  const handleLotsValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers for lots
    const digitsOnly = e.target.value.replace(/\D/g, '');
    setLotsValue(digitsOnly);
  };

  const handleLotsSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setLotsValue(value.toString());
  };

  const handleLotPriceValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInputAsCurrency(e.target.value);
    setLotPriceValue(formatted);
  };

  const handleLotPriceSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setLotPriceValue(value.toLocaleString('en-US'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('hiddenPageAuth', 'true');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-transparent to-gray-100 px-4 py-8">
        <div className="w-full max-w-md space-y-4 sm:space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Protected Page</h1>
            <p className="text-sm sm:text-base text-gray-600">Please enter the password to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-base sm:text-sm"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-xs sm:text-sm text-red-600">{error}</p>
              )}
            </div>
            
            <Button type="submit" className="w-full" size="lg">
              Access Page
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        {/* Header - Visible at top */}
        <div className="bg-white border-b border-gray-200 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 mb-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Hidden Page</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">No one else should be able to see this page</p>
          </div>
        </div>

        {/* Parallax Summary Section - Sticky when it reaches top */}
        <div 
          ref={parallaxContainerRef}
          id="parallaxSummarySection" 
          className={`min-h-[280px] sm:min-h-[400px] overflow-hidden mb-6 sm:mb-12 -mx-4 sm:-mx-6 ${
            isParallaxFixed ? 'fixed top-0 left-0 right-0 z-50' : 'relative'
          }`}
        >
          <div 
            ref={parallaxRef}
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20"
            style={{
              willChange: 'transform'
            }}
          />
          <div className="relative z-10 container mx-auto px-3 sm:px-4 py-4 sm:py-16">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-8 md:p-12 border border-white/20">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-6 md:mb-8 text-center">Net Cashflow Summary</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider bg-blue-50 rounded-tl-lg">Partner</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider bg-blue-50">Phase One</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider bg-green-50 rounded-tr-lg">Phase Two</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b border-gray-200">
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm font-semibold text-gray-800">The Visionary</td>
                      <td className={`px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-right font-bold font-mono bg-blue-50 ${parseValue(zValue) + (netCashflow / 3) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(parseValue(zValue) + (netCashflow / 3))}
                      </td>
                      <td className={`px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-right font-bold font-mono bg-green-50 ${parseValue(zValue) + netCashflow2 / 3 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(parseValue(zValue) + netCashflow2 / 3)}
                      </td>
                    </tr>
                    <tr className="bg-white border-b border-gray-200">
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm font-semibold text-gray-800">The Plumber</td>
                      <td className={`px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-right font-bold font-mono bg-blue-50 ${netCashflow / 3 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(netCashflow / 3)}
                      </td>
                      <td className={`px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-right font-bold font-mono bg-green-50 ${netCashflow2 / 3 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(netCashflow2 / 3)}  
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm font-semibold text-gray-800">The Other Guy</td>
                      <td className={`px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-right font-bold font-mono bg-blue-50 ${netCashflow / 3 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(netCashflow / 3)}
                      </td>
                      <td className={`px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-right font-bold font-mono bg-green-50 ${netCashflow2 / 3 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(netCashflow2 / 3)}  
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer to prevent layout shift when parallax becomes fixed */}
        {isParallaxFixed && <div className="h-[280px] sm:h-[400px]"></div>}

        <div id="partnershipContainer" className="space-y-6">
          {/* Introduction Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Partnership</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              I created this visual to help me understand the math. Feel free to adjust the values to your liking.
            </p>
          </div>
            
          {/* Deal Flow Card - Collapsible */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => setIsDealFlowOpen(!isDealFlowOpen)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-50 transition-colors"
              aria-expanded={isDealFlowOpen}
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Proposed Deal Flow</h3>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${isDealFlowOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDealFlowOpen && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 overflow-x-auto -mx-2 sm:mx-0">
                  <div ref={mermaidRef} className="mermaid flex justify-center items-center min-h-[280px] sm:min-h-[400px]">
                    {/* Mermaid diagram will be rendered here */}
                  </div>
                </div>
              </div>
            )}
          </div>
            
          {/* Dynamic Values Card - Collapsible */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => setIsDynamicValuesOpen(!isDynamicValuesOpen)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-50 transition-colors"
              aria-expanded={isDynamicValuesOpen}
            >
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Dynamic Values</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Adjust to your liking</p>
              </div>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${isDynamicValuesOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDynamicValuesOpen && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="z-value" className="block text-sm font-medium text-gray-900">
                  11ac Parcel
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-base font-medium">$</span>
                  <Input
                    id="z-value"
                    type="text"
                    value={zValue}
                    onChange={handleZValueChange}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 text-base bg-gray-50 border-gray-300 focus:bg-white focus:border-primary"
                  />
                </div>
                <input
                  type="range"
                  min="200000"
                  max="1500000"
                  step="10000"
                  value={parseValue(zValue)}
                  onChange={handleZSliderChange}
                  className="w-full h-4 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider touch-none"
                  style={{
                    background: `linear-gradient(to right, #4B5563 0%, #4B5563 ${((parseValue(zValue) - 200000) / (1500000 - 200000)) * 100}%, #e5e7eb ${((parseValue(zValue) - 200000) / (1500000 - 200000)) * 100}%, #e5e7eb 100%)`
                  }}
                  aria-label="Adjust 11ac Parcel value"
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="x-value" className="block text-sm font-medium text-gray-900">
                  Access Parcel
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-base font-medium">$</span>
                  <Input
                    id="x-value"
                    type="text"
                    value={xValue}
                    onChange={handleXValueChange}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 text-base bg-gray-50 border-gray-300 focus:bg-white focus:border-primary"
                  />
                </div>
                <input
                  type="range"
                  min="300000"
                  max="600000"
                  step="10000"
                  value={parseValue(xValue)}
                  onChange={handleXSliderChange}
                  className="w-full h-4 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider touch-none"
                  style={{
                    background: `linear-gradient(to right, #4B5563 0%, #4B5563 ${((parseValue(xValue) - 300000) / (600000 - 300000)) * 100}%, #e5e7eb ${((parseValue(xValue) - 300000) / (600000 - 300000)) * 100}%, #e5e7eb 100%)`
                  }}
                  aria-label="Adjust Access House Parcel value"
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="misc-value" className="block text-sm font-medium text-gray-900">
                  Misc (Legal & Demo)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-base font-medium">$</span>
                  <Input
                    id="misc-value"
                    type="text"
                    value={miscValue}
                    onChange={handleMiscValueChange}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 text-base bg-gray-50 border-gray-300 focus:bg-white focus:border-primary"
                  />
                </div>
                <input
                  type="range"
                  min="100000"
                  max="500000"
                  step="10000"
                  value={parseValue(miscValue)}
                  onChange={handleMiscSliderChange}
                  className="w-full h-4 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider touch-none"
                  style={{
                    background: `linear-gradient(to right, #4B5563 0%, #4B5563 ${((parseValue(miscValue) - 100000) / (500000 - 100000)) * 100}%, #e5e7eb ${((parseValue(miscValue) - 100000) / (500000 - 100000)) * 100}%, #e5e7eb 100%)`
                  }}
                  aria-label="Adjust Misc value"
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="y-value" className="block text-sm font-medium text-gray-900">
                  Sale Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-base font-medium">$</span>
                  <Input
                    id="y-value"
                    type="text"
                    value={yValue}
                    onChange={handleYValueChange}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 text-base bg-gray-50 border-gray-300 focus:bg-white focus:border-primary"
                  />
                </div>
                <input
                  type="range"
                  min="1200000"
                  max="2800000"
                  step="10000"
                  value={parseValue(yValue)}
                  onChange={handleYSliderChange}
                  className="w-full h-4 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider touch-none"
                  style={{
                    background: `linear-gradient(to right, #4B5563 0%, #4B5563 ${((parseValue(yValue) - 1200000) / (2800000 - 1200000)) * 100}%, #e5e7eb ${((parseValue(yValue) - 1200000) / (2800000 - 1200000)) * 100}%, #e5e7eb 100%)`
                  }}
                  aria-label="Adjust Sale Amount value"
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="arch-eng-value" className="block text-sm font-medium text-gray-900">
                  Architects & Engineering
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-base font-medium">$</span>
                  <Input
                    id="arch-eng-value"
                    type="text"
                    value={archEngValue}
                    onChange={handleArchEngValueChange}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 text-base bg-gray-50 border-gray-300 focus:bg-white focus:border-primary"
                  />
                </div>
                <input
                  type="range"
                  min="25000"
                  max="200000"
                  step="5000"
                  value={parseValue(archEngValue)}
                  onChange={handleArchEngSliderChange}
                  className="w-full h-4 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider touch-none"
                  style={{
                    background: `linear-gradient(to right, #4B5563 0%, #4B5563 ${((parseValue(archEngValue) - 25000) / (200000 - 25000)) * 100}%, #e5e7eb ${((parseValue(archEngValue) - 25000) / (200000 - 25000)) * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="infrastructure-value" className="block text-sm font-medium text-gray-900">
                  Infrastructure
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-base font-medium">$</span>
                  <Input
                    id="infrastructure-value"
                    type="text"
                    value={infrastructureValue}
                    onChange={handleInfrastructureValueChange}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 text-base bg-gray-50 border-gray-300 focus:bg-white focus:border-primary"
                  />
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="2500000"
                  step="10000"
                  value={parseValue(infrastructureValue)}
                  onChange={handleInfrastructureSliderChange}
                  className="w-full h-4 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider touch-none"
                  style={{
                    background: `linear-gradient(to right, #4B5563 0%, #4B5563 ${((parseValue(infrastructureValue) - 1000000) / (2500000 - 1000000)) * 100}%, #e5e7eb ${((parseValue(infrastructureValue) - 1000000) / (2500000 - 1000000)) * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="lots-value" className="block text-sm font-medium text-gray-900">
                  Lots
                </label>
                <Input
                  id="lots-value"
                  type="text"
                  value={lotsValue}
                  onChange={handleLotsValueChange}
                  placeholder="0"
                  className="w-full px-4 py-3 text-base bg-gray-50 border-gray-300 focus:bg-white focus:border-primary"
                />
                <input
                  type="range"
                  min="10"
                  max="40"
                  step="1"
                  value={parseInt(lotsValue) || 10}
                  onChange={handleLotsSliderChange}
                  className="w-full h-4 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider touch-none"
                  style={{
                    background: `linear-gradient(to right, #4B5563 0%, #4B5563 ${(((parseInt(lotsValue) || 10) - 10) / (40 - 10)) * 100}%, #e5e7eb ${(((parseInt(lotsValue) || 10) - 10) / (40 - 10)) * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>
              <div className="space-y-3">
                <label htmlFor="lot-price-value" className="block text-sm font-medium text-gray-900">
                  Lot Average Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-base font-medium">$</span>
                  <Input
                    id="lot-price-value"
                    type="text"
                    value={lotPriceValue}
                    onChange={handleLotPriceValueChange}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 text-base bg-gray-50 border-gray-300 focus:bg-white focus:border-primary"
                  />
                </div>
                <input
                  type="range"
                  min="70000"
                  max="1000000"
                  step="10000"
                  value={parseValue(lotPriceValue)}
                  onChange={handleLotPriceSliderChange}
                  className="w-full h-4 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider touch-none"
                  style={{
                    background: `linear-gradient(to right, #4B5563 0%, #4B5563 ${((parseValue(lotPriceValue) - 70000) / (1000000 - 70000)) * 100}%, #e5e7eb ${((parseValue(lotPriceValue) - 70000) / (1000000 - 70000)) * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>
                </div>
              </div>
            )}
          </div>
            
          {/* Cashflow Card Phase One - Collapsible */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => setIsPhaseOneOpen(!isPhaseOneOpen)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-50 transition-colors"
              aria-expanded={isPhaseOneOpen}
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Phase One - Cashflow for Each Partner</h3>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${isPhaseOneOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isPhaseOneOpen && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
            <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
              <div className="inline-block min-w-full align-middle">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b-2 border-gray-200">
                      <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">Step</th>
                      <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[120px]">The Visionary</th>
                      <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[120px]">The Plumber</th>
                      <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[120px]">The Other Guy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3 text-sm font-medium text-red-600 sticky left-0 bg-white z-10">Buy 11ac Parcel - {formatCurrency(parseValue(zValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-calculateThird(zValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-calculateThird(zValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-calculateThird(zValue))}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3 text-sm font-medium text-red-600 sticky left-0 bg-white z-10">Buy Access Parcel - {formatCurrency(parseValue(xValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-calculateThird(xValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-calculateThird(xValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-calculateThird(xValue))}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3 text-sm font-medium text-red-600 sticky left-0 bg-white z-10">Misc - {formatCurrency(parseValue(miscValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-calculateThird(miscValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-calculateThird(miscValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-calculateThird(miscValue))}</td>
                    </tr>
                     <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                       <td className="px-3 py-3 text-sm font-semibold text-red-600 sticky left-0 bg-gray-50 z-10">Total Investment - {formatCurrency(totalInvestment)}</td>
                       <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-totalInvestment / 3)}</td>
                       <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-totalInvestment / 3)}</td>
                       <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-totalInvestment / 3)}</td>
                     </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3 text-sm font-medium text-green-600 sticky left-0 bg-white z-10">Sell at Phase One - {formatCurrency(parseValue(yValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-green-600">{formatCurrency(calculateThird(yValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-green-600">{formatCurrency(calculateThird(yValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-green-600">{formatCurrency(calculateThird(yValue))}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3 text-sm font-medium text-green-600 sticky left-0 bg-white z-10">11ac Proceeds (Step 2) - {formatCurrency(parseValue(zValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-green-600 font-semibold">{formatCurrency(parseValue(zValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-gray-500 font-semibold">{formatCurrency(0)}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-gray-500 font-semibold">{formatCurrency(0)}</td>
                    </tr>
                    <tr id="netCashflowRow" className="bg-blue-50 hover:bg-blue-100 transition-colors border-t-2 border-blue-200">
                      <td className="px-3 py-3 text-sm font-bold text-green-600 sticky left-0 bg-blue-50 z-10">Net Cashflow - {formatCurrency(netCashflow)}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono font-bold">
                        <span className={parseValue(zValue) + netCashflow / 3 >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(parseValue(zValue) + netCashflow / 3)}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm text-right font-mono font-bold">
                        <span className={netCashflow / 3 >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(netCashflow / 3)}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm text-right font-mono font-bold">
                        <span className={netCashflow / 3 >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(netCashflow / 3)}
                        </span>
                      </td>
                    </tr>
                  
                  </tbody>
                </table>
                </div>
              </div>
              </div>
            )}
          </div>

            {/* Cashflow Card Phase Two - Collapsible */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => setIsPhaseTwoOpen(!isPhaseTwoOpen)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-50 transition-colors"
              aria-expanded={isPhaseTwoOpen}
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Phase Two - Cashflow for Each Partner</h3>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${isPhaseTwoOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isPhaseTwoOpen && (
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
            <div className="overflow-x-auto -mx-5 sm:-mx-6 px-5 sm:px-6">
              <div className="inline-block min-w-full align-middle">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b-2 border-gray-200">
                      <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">Step</th>
                      <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[120px]">The Visionary</th>
                      <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[120px]">The Plumber</th>
                      <th className="px-3 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[120px]">The Other Guy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3 text-sm font-medium text-red-600 sticky left-0 bg-white z-10">Develop Vision - {formatCurrency(parseValue(archEngValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-calculateThird(archEngValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-calculateThird(archEngValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-calculateThird(archEngValue))}</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                      <td className="px-3 py-3 text-sm font-semibold text-red-600 sticky left-0 bg-gray-50 z-10">Infrastructure (Roads & Utilities) - {formatCurrency(parseValue(infrastructureValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-calculateThird(infrastructureValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-calculateThird(infrastructureValue))}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-calculateThird(infrastructureValue))}</td>
                    </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                        <td className="px-3 py-3 text-sm font-semibold text-red-600 sticky left-0 bg-gray-50 z-10">Phase One Investment - {formatCurrency(totalInvestment)}</td>
                        <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-totalInvestment / 3)}</td>
                        <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-totalInvestment / 3)}</td>
                        <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-totalInvestment / 3)}</td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                        <td className="px-3 py-3 text-sm font-semibold text-red-600 sticky left-0 bg-gray-50 z-10">Phase Two Investment - {formatCurrency(totalInvestment2)}</td>
                        <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-totalInvestment2 / 3)}</td>
                        <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-totalInvestment2 / 3)}</td>
                        <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-totalInvestment2 / 3)}</td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                        <td className="px-3 py-3 text-sm font-semibold text-red-600 sticky left-0 bg-gray-50 z-10">Total Investment - {formatCurrency(totalInvestment + totalInvestment2)}</td>
                        <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-(totalInvestment + totalInvestment2) / 3)}</td>
                        <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-(totalInvestment + totalInvestment2) / 3)}</td>
                        <td className="px-3 py-3 text-sm text-right font-mono text-red-600">{formatCurrency(-(totalInvestment + totalInvestment2) / 3)}</td>
                      </tr>
                     <tr className="hover:bg-gray-50 transition-colors">
                       <td className="px-3 py-3 text-sm font-medium text-green-600 sticky left-0 bg-white z-10">Sell Lots - {formatCurrency(phaseTwoSell)}</td>
                       <td className="px-3 py-3 text-sm text-right font-mono text-green-600 font-semibold">{formatCurrency(phaseTwoSell / 3)}</td>
                       <td className="px-3 py-3 text-sm text-right font-mono text-green-600 font-semibold">{formatCurrency(phaseTwoSell / 3)}</td>
                       <td className="px-3 py-3 text-sm text-right font-mono text-green-600 font-semibold">{formatCurrency(phaseTwoSell / 3)}</td>
                     </tr>
                    <tr id="netCashflow2Row" className="bg-blue-50 hover:bg-blue-100 transition-colors border-t-2 border-blue-200">
                      <td className="px-3 py-3 text-sm font-bold text-green-600 sticky left-0 bg-blue-50 z-10">Net Cashflow - {formatCurrency(netCashflow2)}</td>
                      <td className="px-3 py-3 text-sm text-right font-mono font-bold">
                        <span className={parseValue(zValue) + netCashflow2 / 3 >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(parseValue(zValue) + netCashflow2 / 3)}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm text-right font-mono font-bold">
                        <span className={netCashflow2 >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(netCashflow2 / 3)}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm text-right font-mono font-bold">
                        <span className={netCashflow2 >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(netCashflow2 / 3)}
                        </span>
                      </td>
                    </tr>
                    {/*}
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold">ROI</td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold">
                        {(() => {
                          const investment = totalInvestment;
                          const return_ = parseValue(zValue) + netCashflow;
                          const roi = investment > 0 ? ((totalInvestment - return_) / return_) * 100 : 0;
                          return `${roi.toFixed(1)}%`;
                        })()}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold">
                        {(() => {
                          const investment = totalInvestment;
                          const return_ = netCashflow;
                          const roi = investment > 0 ? ((investment - return_) / return_) * 100 : 0;
                          return `${roi.toFixed(1)}%`;
                          //return return_;
                        })()}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700 font-semibold">
                        {(() => {
                          const investment = parseValue(zValue) + calculateThird(zValue) + calculateThird(xValue) + calculateThird(miscValue);
                          const return_ = (netCashflow * (1/3)) 
                          const roi = investment > 0 ? ((return_ - investment) / return_) * 100 : 0;
                          return `${roi.toFixed(1)}%`;
                        })()}
                      </td>
                    </tr>
                    */}
                  </tbody>
                </table>
                </div>
              </div>
              </div>
            )}
          </div>

          {/* Note Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-5">
            <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
              <strong className="font-semibold">Note:</strong> My Assumptions:
              <p> - Infrastructure cost of $1,395,000 is priced at 3,100 linear feet of roads at $450 per foot.</p>
              <p> - Lot average price of $250,000 is based on the average listed prices in the area.</p>
              <p> - Lot count of 24 is a guess based on 9.5ac of buildable less roads.</p>
              <p> - Lot size of 1/4 acre is based on the min for r1 zoning.</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

