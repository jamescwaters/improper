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
  const [zValue, setZValue] = useState('1,500,000');
  const [xValue, setXValue] = useState('500,000');
  const [yValue, setYValue] = useState('1,500,000');
  const [miscValue, setMiscValue] = useState('100,000');

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
          E -->|No| G["Develop Vision"]`;

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

  const totalInvestment = calculateThird(zValue) + calculateThird(xValue) + calculateThird(miscValue);
  const netCashflow = calculateThird(yValue) - totalInvestment;

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
    <div className="min-h-screen bg-gradient-to-b from-transparent to-gray-100 px-3 sm:px-4 py-6 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Hidden Page</h1>
            <p className="text-sm sm:text-base text-gray-600">No one else should be able to see this page</p>
          </div>
          
          <div className="border-t pt-4 sm:pt-6 space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Parntership</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              I created this visual to help me understand the math. Feel free to adjust the values to your liking.
            </p>
            
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Proposed Deal Flow</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 overflow-x-auto -mx-3 sm:mx-0">
                <div ref={mermaidRef} className="mermaid flex justify-center items-center min-h-[300px] sm:min-h-[400px]">
                  {/* Mermaid diagram will be rendered here */}
                </div>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Dynamic Values - Adjust to your liking</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <label htmlFor="z-value" className="block text-sm font-medium text-gray-700">
                    11ac Parcel (z)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="z-value"
                      type="text"
                      value={zValue}
                      onChange={handleZValueChange}
                      placeholder="0"
                      className="w-full pl-7"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="10000"
                    value={parseValue(zValue)}
                    onChange={handleZSliderChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #4B5563 0%, #4B5563 ${(parseValue(zValue) / 5000000) * 100}%, #e5e7eb ${(parseValue(zValue) / 5000000) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="x-value" className="block text-sm font-medium text-gray-700">
                    Access House Parcel (x)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="x-value"
                      type="text"
                      value={xValue}
                      onChange={handleXValueChange}
                      placeholder="0"
                      className="w-full pl-7"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="10000"
                    value={parseValue(xValue)}
                    onChange={handleXSliderChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #4B5563 0%, #4B5563 ${(parseValue(xValue) / 5000000) * 100}%, #e5e7eb ${(parseValue(xValue) / 5000000) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="y-value" className="block text-sm font-medium text-gray-700">
                    Sale Amount (y)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="y-value"
                      type="text"
                      value={yValue}
                      onChange={handleYValueChange}
                      placeholder="0"
                      className="w-full pl-7"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="10000"
                    value={parseValue(yValue)}
                    onChange={handleYSliderChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #4B5563 0%, #4B5563 ${(parseValue(yValue) / 10000000) * 100}%, #e5e7eb ${(parseValue(yValue) / 10000000) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="misc-value" className="block text-sm font-medium text-gray-700">
                    Misc(Legal & Demo)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="misc-value"
                      type="text"
                      value={miscValue}
                      onChange={handleMiscValueChange}
                      placeholder="0"
                      className="w-full pl-7"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000000"
                    step="10000"
                    value={parseValue(miscValue)}
                    onChange={handleMiscSliderChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #4B5563 0%, #4B5563 ${(parseValue(miscValue) / 2000000) * 100}%, #e5e7eb ${(parseValue(miscValue) / 2000000) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Cashflow</h3>
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-gray-800 whitespace-nowrap">Step</th>
                        <th id="Scott" className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-gray-800 whitespace-nowrap">The Visionary</th>
                        <th id="Russ" className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-gray-800 whitespace-nowrap">The Plumber</th>
                        <th id="James" className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-gray-800 whitespace-nowrap">The Other Guy</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 whitespace-nowrap">Buy 11ac Parcel</td>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700">{formatCurrency(-calculateThird(zValue))}</td>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700">{formatCurrency(-calculateThird(zValue))}</td>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700">{formatCurrency(-calculateThird(zValue))}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 whitespace-nowrap">Buy Access Parcel</td>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700">{formatCurrency(-calculateThird(xValue))}</td>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700">{formatCurrency(-calculateThird(xValue))}</td>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700">{formatCurrency(-calculateThird(xValue))}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 whitespace-nowrap">Misc</td>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700">{formatCurrency(-calculateThird(miscValue))}</td>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700">{formatCurrency(-calculateThird(miscValue))}</td>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700">{formatCurrency(-calculateThird(miscValue))}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 whitespace-nowrap">Sell at Phase One</td>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700">{formatCurrency(calculateThird(yValue))}</td>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700">{formatCurrency(calculateThird(yValue))}</td>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700">{formatCurrency(calculateThird(yValue))}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 font-semibold whitespace-nowrap">Gross Cashflow</td>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 font-semibold">
                          {formatCurrency(calculateThird(yValue) - calculateThird(zValue) - calculateThird(xValue) - calculateThird(miscValue))}
                        </td>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 font-semibold">
                          {formatCurrency(calculateThird(yValue) - calculateThird(zValue) - calculateThird(xValue) - calculateThird(miscValue))}
                        </td>
                        <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 font-semibold">
                          {formatCurrency(calculateThird(yValue) - calculateThird(zValue) - calculateThird(xValue) - calculateThird(miscValue))}
                        </td>
                      </tr>
                    <tr>
                      <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 font-semibold whitespace-nowrap">11ac Proceeds (Step 2)</td>
                      <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 font-semibold">
                        {formatCurrency(parseValue(zValue))}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 font-semibold">
                        {formatCurrency(0)}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 font-semibold">
                        {formatCurrency(0)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 font-semibold whitespace-nowrap">Net Cashflow</td>
                      <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 font-semibold">
                        {formatCurrency(parseValue(zValue) + netCashflow)}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 font-semibold">
                        {formatCurrency(netCashflow)}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 font-semibold">
                      {formatCurrency(netCashflow)}
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
            
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-md">
              <p className="text-xs sm:text-sm text-gray-600">
                <strong>Note:</strong> Your authentication will persist for this browser session. 
                If you close the browser tab or clear session storage, you'll need to enter the password again.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

