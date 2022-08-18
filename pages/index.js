import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6">Explore Examples</Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button onClick={() => router.push("/ag-grid")}>AG-Grid</Button>
      </Stack>
    </Box>
  );
}
