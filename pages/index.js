import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import examples from "../examples.json";
export default function Home() {
  const router = useRouter();
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6">Explore Examples</Typography>
      <Stack direction="column" spacing={2} sx={{ mt: 2, width: 100 }}>
        {examples.map((e) => (
          <Button onClick={() => router.push(e.route)}>{e.title}</Button>
        ))}
      </Stack>
    </Box>
  );
}
