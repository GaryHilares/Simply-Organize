function parseFormat(string) {
    // Check that string is not null nor empty
    if (!string) {
        return string;
    }

    // Parse the start of each string to add format as needed
    return string.split("\n").map((line, index) => {
        // Define patterns to search for
        const patterns = [
            { prefix: "* ", styles: { fontWeight: "bold" } },
            { prefix: "DONE ", styles: { backgroundColor: "SpringGreen" } },
            { prefix: "NOTDONE", styles: { backgroundColor: "Tomato" } },
        ];

        // Search for patterns
        for (const pattern of patterns) {
            if (line.startsWith(pattern.prefix)) {
                return (
                    <>
                        <span key={index} style={pattern.styles}>
                            {line.substring(pattern.prefix.length)}
                        </span>
                        <br />
                    </>
                );
            }
        }

        // No match found, so return default
        return (
            <>
                {line}
                <br />
            </>
        );
    });
}

export { parseFormat };
