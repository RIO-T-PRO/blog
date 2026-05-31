const WriterEditor = () => {
  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <input
          className="w-full border-none bg-transparent font-display text-6xl tracking-tight text-on-surface outline-none placeholder:text-outline"
          placeholder="Untitled Story"
        />

        <textarea
          className="mt-10 min-h-[70vh] w-full resize-none border-none bg-transparent font-reading text-2xl leading-[2.2rem] text-on-surface-variant outline-none placeholder:text-outline"
          placeholder="Start writing..."
        />
      </div>
    </div>
  );
};

export default WriterEditor;
