import markdownpdf from "markdown-pdf";
import remarkableClassy from "remarkable-classy";

var mdDocs = [
    "README.md",
    "reference/MaturityModel.md",
    "reference/DesignPrinciples.md",
    "reference/RestConstraints.md",
    "standards/UrlsAndVerbs.md",
    "standards/Versioning.md",
    "standards/Security.md",
    "standards/MandatoryEndpoints.md",
    "guidelines/StatusCodes.md",
    "guidelines/ProblemDetails.md",
    "guidelines/Collections.md",
    "guidelines/Naming.md",
    "guidelines/NewAPIChecklist.md",
];

var bookPath = "./dist/output.pdf";

var options = {
    remarkable: {
        html: true,
        breaks: true,
        plugins: [remarkableClassy],
        syntax: ['footnote', 'sup', 'sub']
    }
}

markdownpdf(options).concat.from(mdDocs).to(bookPath, () => {
    console.log("Created", bookPath)
});
