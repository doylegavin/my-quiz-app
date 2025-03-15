import React, { useState } from 'react';

interface MathDiagramFormProps {
  onSubmit: (data: any) => void;
  diagramType: 'circle' | 'line' | 'function' | 'complex';
  defaultValues?: any;
}

const MathDiagramForm: React.FC<MathDiagramFormProps> = ({
  onSubmit,
  diagramType,
  defaultValues = {}
}) => {
  const [formData, setFormData] = useState({
    // Circle defaults
    centerX: defaultValues.centerX || 0,
    centerY: defaultValues.centerY || 0,
    radius: defaultValues.radius || 1,
    
    // Line defaults
    slope: defaultValues.slope || 1,
    yIntercept: defaultValues.yIntercept || 0,
    
    // Function defaults
    functionType: defaultValues.functionType || 'quadratic',
    a: defaultValues.a || 1,
    b: defaultValues.b || 0,
    c: defaultValues.c || 0,
    
    // Complex number defaults
    real: defaultValues.real || 0,
    imaginary: defaultValues.imaginary || 0,
    
    // Display options
    showSolution: defaultValues.showSolution !== undefined ? defaultValues.showSolution : true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked
      });
      return;
    }
    
    // Handle numeric inputs
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value)
      });
      return;
    }
    
    // Handle other inputs
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="math-diagram-form p-4 border rounded-lg mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Diagram Parameters</h3>
        
        {/* Circle Form Fields */}
        {diagramType === 'circle' && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1">Center X:</label>
                <input
                  type="number"
                  name="centerX"
                  value={formData.centerX}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Center Y:</label>
                <input
                  type="number"
                  name="centerY"
                  value={formData.centerY}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Radius:</label>
              <input
                type="number"
                name="radius"
                value={formData.radius}
                onChange={handleChange}
                min="0.1"
                step="0.1"
                className="w-full p-2 border rounded"
              />
            </div>
          </>
        )}
        
        {/* Line Form Fields */}
        {diagramType === 'line' && (
          <>
            <div className="mb-4">
              <label className="block mb-1">Slope (m):</label>
              <input
                type="number"
                name="slope"
                value={formData.slope}
                onChange={handleChange}
                step="0.1"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Y-Intercept (b):</label>
              <input
                type="number"
                name="yIntercept"
                value={formData.yIntercept}
                onChange={handleChange}
                step="0.1"
                className="w-full p-2 border rounded"
              />
            </div>
          </>
        )}
        
        {/* Function Form Fields */}
        {diagramType === 'function' && (
          <>
            <div className="mb-4">
              <label className="block mb-1">Function Type:</label>
              <select
                name="functionType"
                value={formData.functionType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="linear">Linear (ax + b)</option>
                <option value="quadratic">Quadratic (ax² + bx + c)</option>
                <option value="cubic">Cubic (ax³ + bx² + cx + d)</option>
                <option value="exponential">Exponential (a^x)</option>
                <option value="logarithmic">Logarithmic (log_a(x))</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block mb-1">a:</label>
                <input
                  type="number"
                  name="a"
                  value={formData.a}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">b:</label>
                <input
                  type="number"
                  name="b"
                  value={formData.b}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">c:</label>
                <input
                  type="number"
                  name="c"
                  value={formData.c}
                  onChange={handleChange}
                  step="0.1"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </>
        )}
        
        {/* Complex Number Form Fields */}
        {diagramType === 'complex' && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">Real Part:</label>
              <input
                type="number"
                name="real"
                value={formData.real}
                onChange={handleChange}
                step="0.1"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Imaginary Part:</label>
              <input
                type="number"
                name="imaginary"
                value={formData.imaginary}
                onChange={handleChange}
                step="0.5"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        )}
        
        {/* Display Options */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="showSolution"
              checked={formData.showSolution}
              onChange={handleChange}
              className="mr-2"
            />
            Show Solution
          </label>
        </div>
      </div>
      
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Update Diagram
      </button>
    </form>
  );
};

export default MathDiagramForm;