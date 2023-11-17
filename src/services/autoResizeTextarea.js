export function autoresizeTextarea(textareaRefs = [], textareaHeight = 'auto') {
    textareaRefs.current?.forEach(textarea => {
        if (textarea) {
            textarea.style.height = textareaHeight;
            const scrollHeight = textarea.scrollHeight;
            textarea.style.height = `${scrollHeight}px`
        }
    });
};