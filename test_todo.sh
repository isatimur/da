#!/bin/bash
echo "Testing TODO Feature..."
echo "======================="
echo ""
echo "1. Checking if all files exist:"
ls -lh chrome-extension/js/services/todoService.js
ls -lh chrome-extension/js/components/todoWidget.js
ls -lh chrome-extension/js/components/todoManager.js
ls -lh chrome-extension/css/todo.css
echo ""
echo "2. Checking imports in app.js:"
grep -n "todo" chrome-extension/js/app.js | grep -i "import" | head -5
echo ""
echo "3. Checking CSS bundle includes todo.css:"
grep -q "todo.css" chrome-extension/build.js && echo "✅ todo.css in build" || echo "❌ todo.css NOT in build"
echo ""
echo "4. Checking manifest version:"
grep "version" chrome-extension/manifest.json
echo ""
echo "✅ All checks complete!"
