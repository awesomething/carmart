
const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    setQueryStates({
      [name]: value || null
    });
  
    if (name === "make") {
      setQueryStates({
        model: null,
        modelVariant: null,
      });
    }
  
    router.refresh();
  };
  


<div className="p-4">
<SearchInput 
placeholder="Search classifieds..."
className="w-full px-3 py-2 border rounded-md focus:outline-hidden 
focus:ring-2 focus:ring-blue-500"


/>
</div>

<div className="p-4 space-y-2">
  <TaxonomyFilters searchParams={searchParams} 
  handleChange={handleChange} />
</div>
